from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
import shutil, os
from datetime import datetime

from app.services.ifc_processor import process_ifc

router = APIRouter()

@router.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(".ifc"):
        return JSONResponse(
            content={"mensagem": "Formato de arquivo inválido. Envie um arquivo .IFC."},
            status_code=400
        )

    os.makedirs("uploads", exist_ok=True)

    file_path = f"uploads/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # ✅ Salva o nome e data/hora do upload
    log_path = "uploads/file_update.txt"
    with open(log_path, "a") as f:
        f.write(f"{file.filename} - enviado em {datetime.now().strftime('%d/%m/%Y %H:%M:%S')}\n")


    try:
        materiais = process_ifc(file_path)
    except Exception as e:
        return JSONResponse(
            content={"mensagem": f"Erro ao processar o arquivo: {str(e)}"},
            status_code=500
        )

    return {"mensagem": "Arquivo processado com sucesso!", "materiais": materiais}
