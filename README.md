# SkillMesh — Semantic Skill-Based Job Matching for IT Careers

Final-year thesis project. A web platform that parses a candidate's CV, builds a
persistent IT skill profile, and matches it against a pool of IT job postings using
NLP-based semantic similarity (not plain keyword matching) — returning a compatibility
percentage and a list of missing skills per job.

This repo is a **monorepo** with two independent apps:

```
skillmesh/
├── client/    React (JavaScript) + Vite — the web UI (mockups: "SkillMesh")
├── server/    Python + FastAPI — the API, the CV/skill extraction, and the
│              semantic matching (embeddings over pre-trained language models)
└── .github/workflows/ci.yml   — CI: lints/builds client, lints/tests server
```

## Why this split

The thesis summary describes three logical parts: a web front end, a backend server,
and an "AI module" that extracts skills and performs semantic matching. Rather than
running three separate services (extra complexity for a solo thesis project), the AI
module lives **inside** `/server` as a Python service module — FastAPI can host both the
regular CRUD/auth API and the NLP pipeline in one process, and Python has the
strongest ecosystem for this (spaCy / sentence-transformers / HuggingFace).

## Prerequisites

- Node.js 20+ and npm (client)
- Python 3.11+ (server)
- PostgreSQL 14+ (or Docker, once you add a docker-compose — not set up yet)

## Getting started

### Client

```bash
cd client
cp .env.example .env      # fill in values
npm install
npm run dev                # starts Vite dev server
```

### Server

```bash
cd server
cp .env.example .env      # fill in values, especially DATABASE_URL
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload   # starts API on http://localhost:8000
```

Health check once running: `GET http://localhost:8000/health`

## Environment variables

Each app has its own `.env.example` documenting exactly what it needs — see
`client/.env.example` and `server/.env.example`. Real `.env` files are gitignored and
must never be committed.

## Continuous Integration

`.github/workflows/ci.yml` runs on every push and pull request:
- installs client dependencies and runs `npm run build`
- installs server dependencies and runs `ruff` (lint) and `pytest`

This is intentionally minimal for now (structure/sanity check) — it will grow as
real features land (CV parsing, matching logic, etc.).

## Project status

This is step 1 of the implementation plan: project structure, Git, environment
variable templates, and a basic CI check. No application logic yet.
