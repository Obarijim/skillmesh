import os
import uuid
from datetime import datetime

from authlib.integrations.starlette_client import OAuth
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Column, DateTime, Integer, String, create_engine
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


@app.get("/api/health")
def health():
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