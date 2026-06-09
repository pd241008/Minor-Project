from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.api.api_router import api_router
from app.middleware.cors import setup_cors
from app.middleware.logging import timing_middleware
from app.core.dependencies import load_resources
from app.core.config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Loading ML models and data...")
    load_resources()
    print("✅ Initialization complete.")
    yield
    print("Shutting down...")

app = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan) # type: ignore

setup_cors(app)
app.middleware("http")(timing_middleware)

app.include_router(api_router)
