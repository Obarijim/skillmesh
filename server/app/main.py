import io
import os
import uuid
from datetime import datetime

import pdfplumber
from authlib.integrations.starlette_client import OAuth
from docx import Document
from fastapi import FastAPI, File, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
    Text,
    create_engine,
)
from sqlalchemy.orm import declarative_base, sessionmaker
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import RedirectResponse

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./test.db")
SESSION_SECRET = os.environ.get("SESSION_SECRET", "dev-only-secret-change-me")
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET")
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:5173")
ENV = os.environ.get("ENV", "development")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True, nullable=True)
    google_sub = Column(String, unique=True, nullable=True)
    session_id = Column(String, unique=True, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class CVUpload(Base):
    __tablename__ = "cv_uploads"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    filename = Column(String, nullable=False)
    raw_text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


Base.metadata.create_all(engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(
    SessionMiddleware,
    secret_key=SESSION_SECRET,
    same_site="none",
    https_only=True,
)

oauth = OAuth()
if GOOGLE_CLIENT_ID:
    oauth.register(
        name="google",
        client_id=GOOGLE_CLIENT_ID,
        client_secret=GOOGLE_CLIENT_SECRET,
        server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
        client_kwargs={"scope": "openid email profile"},
    )


@app.get("/")
def root():
    return {"message": "SkillMesh API is running. See /docs for the API reference."}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/auth/google/login")
async def google_login(request: Request):
    redirect_uri = request.url_for("google_callback")
    return await oauth.google.authorize_redirect(request, redirect_uri)


@app.get("/auth/google/callback")
async def google_callback(request: Request):
    token = await oauth.google.authorize_access_token(request)
    userinfo = token["userinfo"]

    db = SessionLocal()
    user = db.query(User).filter(User.google_sub == userinfo["sub"]).first()
    if not user:
        user = User(email=userinfo["email"], google_sub=userinfo["sub"])
        db.add(user)
        db.commit()
        db.refresh(user)
    db.close()

    request.session["user_id"] = user.id
    return RedirectResponse(url=f"{FRONTEND_URL}/profile")


@app.post("/auth/session")
def create_anonymous_session(request: Request):
    db = SessionLocal()
    user = User(session_id=str(uuid.uuid4()))
    db.add(user)
    db.commit()
    db.refresh(user)
    db.close()

    request.session["user_id"] = user.id
    return {"ok": True}


@app.get("/api/me")
def me(request: Request):
    user_id = request.session.get("user_id")
    return {"authenticated": bool(user_id), "user_id": user_id}


def extract_text_from_pdf(file_bytes: bytes) -> str:
    text_parts = []
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text_parts.append(page_text)
    return "\n".join(text_parts)


def extract_text_from_docx(file_bytes: bytes) -> str:
    document = Document(io.BytesIO(file_bytes))
    return "\n".join(paragraph.text for paragraph in document.paragraphs)


@app.post("/api/cv/upload")
async def upload_cv(request: Request, file: UploadFile = File(...)):  # noqa: B008
    user_id = request.session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Sign in before uploading a CV")

    filename = file.filename or ""
    lower_name = filename.lower()
    file_bytes = await file.read()

    if lower_name.endswith(".pdf"):
        raw_text = extract_text_from_pdf(file_bytes)
    elif lower_name.endswith(".docx"):
        raw_text = extract_text_from_docx(file_bytes)
    else:
        raise HTTPException(status_code=400, detail="Only .pdf and .docx files are supported")

    if not raw_text.strip():
        raise HTTPException(status_code=422, detail="No readable text found in this file")

    db = SessionLocal()
    cv_upload = CVUpload(user_id=user_id, filename=filename, raw_text=raw_text)
    db.add(cv_upload)
    db.commit()
    db.refresh(cv_upload)
    db.close()

    return {
        "id": cv_upload.id,
        "filename": cv_upload.filename,
        "characters_extracted": len(raw_text),
    }