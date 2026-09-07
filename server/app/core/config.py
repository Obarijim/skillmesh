"""
Centralized app configuration, loaded from environment variables (.env).

Using pydantic-settings means every setting is validated once at startup instead of
being read ad-hoc (and possibly misspelled/mistyped) all over the codebase.
"""
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # --- App ---
    APP_NAME: str = "SkillMesh API"
    ENVIRONMENT: str = "development"  # development | test | production
    DEBUG: bool = True

    # --- CORS (comma-separated list of allowed origins) ---
    CORS_ORIGINS: str = "http://localhost:5173"

    # --- Database ---
    DATABASE_URL: str = "postgresql+psycopg2://skillmesh:skillmesh@localhost:5432/skillmesh"

    # --- Auth (placeholder for later; not used yet) ---
    SECRET_KEY: str = "change-me-in-env"

    # --- AI / NLP module (placeholder for later; not used yet) ---
    EMBEDDING_MODEL_NAME: str = "sentence-transformers/all-MiniLM-L6-v2"

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    """Cached so Settings() is only parsed once per process."""
    return Settings()
