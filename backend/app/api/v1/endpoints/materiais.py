from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.services.ifc_processor import process_ifc
from app.services.database import salvar_materiais

import os
from typing import List

router = APIRouter()


@router.get("/materiais/", response_model=List[dict])
def get_materiais():
    file_path = "uploads/ultimo_ifc.ifc"

    if not os.path.exists(file_path):
        return []

    resultado = process_ifc(file_path)
    return resultado["materiais"]


@router.post("/salvar/")
def salvar_no_banco():
    try:
        with open("uploads/ultimo_nome.txt", "r") as f:
            filename = f.read().strip()
    except FileNotFoundError:
        return JSONResponse(
            content={"mensagem": "Nenhum arquivo foi enviado ainda."},
            status_code=400
        )

    file_path = f"uploads/{filename}"

    if not os.path.exists(file_path):
        return JSONResponse(
            content={"mensagem": "Arquivo ainda não foi processado!"},
            status_code=400
        )

    resultado = process_ifc(file_path)
    salvar_materiais(filename, resultado["materiais"])

    return {"mensagem": "Materiais salvos no MongoDB com sucesso!"}
