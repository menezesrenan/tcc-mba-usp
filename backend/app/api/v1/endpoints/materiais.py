from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.services.ifc_processor import process_ifc
from app.services.database import salvar_materiais, collection

import os
from typing import List

router = APIRouter()


@router.get("/materiais/", response_model=List[dict])
def get_materiais():
    try:
        # Lê o nome do último arquivo enviado
        with open("uploads/last_file.txt", "r") as f:
            filename = f.read().strip()
    except FileNotFoundError:
        print("Arquivo last_file.txt não encontrado.")
        return JSONResponse(
            content={"mensagem": "Nenhum arquivo foi enviado ainda."},
            status_code=400
        )

    file_path = f"uploads/{filename}"

    if not os.path.exists(file_path):
        print(f"Arquivo não encontrado: {file_path}")
        return JSONResponse(
            content={"mensagem": "Arquivo IFC não encontrado."},
            status_code=400
        )

    resultado = process_ifc(file_path)
    return resultado["materiais"]


@router.post("/salvar/")
def salvar_no_banco():
    try:
        with open("uploads/last_file.txt", "r") as f:
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

@router.get("/materiais/salvos/", response_model=List[dict])
def get_materiais_salvos():
    try:
        materiais = list(collection.find({}, {"_id": 0}))  # Exclui o campo "_id" do retorno
        return materiais
    except Exception as e:
        return JSONResponse(
            content={"mensagem": f"Erro ao buscar materiais salvos: {str(e)}"},
            status_code=500
        )
