from pydantic import BaseModel

class IFCUploadResponse(BaseModel):
    filename: str
    volume_concreto: float
