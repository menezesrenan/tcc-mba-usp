from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import shutil
import os
from typing import List
from services.ifc_processor import process_ifc  # ✅ Importando a função corrigida

app = FastAPI()

# ✅ Middleware para permitir requisições de diferentes origens (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 🔹 Permite todas as origens (mude para ['http://localhost:5173'] se quiser mais segurança)
    allow_credentials=True,
    allow_methods=["*"],  # 🔹 Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # 🔹 Permite todos os headers
)

# 🔹 Rota para upload do arquivo IFC
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_path = "uploads/ultimo_ifc.ifc"  # Sempre salva com esse nome

    os.makedirs("uploads", exist_ok=True)  # Garante que a pasta existe
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    materiais = process_ifc(file_path)

    return {"mensagem": "Arquivo processado com sucesso!", "materiais": materiais}

# 🔹 Rota para listar os materiais já processados
@app.get("/materiais/", response_model=List[dict])
def get_materiais():
    file_path = "uploads/ultimo_ifc.ifc"

    if not os.path.exists(file_path):
        return []

    resultado = process_ifc(file_path)

    return resultado["materiais"]  # ✅ Retorna apenas a lista de materiais

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "API funcionando corretamente 🚀"}
