from fastapi import APIRouter
from app.api.routes import attack, defence, health

api_router = APIRouter()

api_router.include_router(attack.router, prefix="/attack", tags=["attack"])
api_router.include_router(defence.router, prefix="/defence", tags=["defence"])
api_router.include_router(health.router, tags=["health"])
