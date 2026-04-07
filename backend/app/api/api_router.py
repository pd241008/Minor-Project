from fastapi import APIRouter
from app.api.attack.attack import attack_router
from app.api.defence.defence import defence_router
from app.api.health import health_router

api_router = APIRouter()

api_router.include_router(attack_router, prefix="/attack", tags=["Attack"])
api_router.include_router(defence_router, prefix="/defence", tags=["Defence"])
api_router.include_router(health_router, tags=["Health"])
