from fastapi import APIRouter
from app.api.v1.endpoints import upload, materiais

router = APIRouter()
router.include_router(upload.router, prefix="/v1", tags=["Upload"])
router.include_router(materiais.router, prefix="/v1", tags=["Materiais"])
