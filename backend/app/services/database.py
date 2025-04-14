from pymongo import MongoClient
from datetime import datetime

client = MongoClient("mongodb://localhost:27017/")
db = client["tcc_mba_usp_quantitativo_bim"]
collection = db["materiais"]

def salvar_materiais(filename: str, materiais: list):
    documento = {
        "filename": filename,
        "materiais": materiais,
        "created_at": datetime.utcnow()
    }
    resultado = collection.insert_one(documento)
    return str(resultado.inserted_id)
