from fastapi import APIRouter, UploadFile, File, Form
from services.face_validator import verify_faces
from utils.file_utils import save_upload

router = APIRouter()

@router.post("/")
async def verify_identity(
    cpf: str = Form(..., description="CPF do fã"),
    selfie: UploadFile = File(..., description="Upload da selfie do fã"),
    document: UploadFile = File(..., description="Upload do documento do fã")
):
    selfie_path = save_upload(selfie, f"{cpf}_selfie.jpg")
    doc_path = save_upload(document, f"{cpf}_document.jpg")
    return verify_faces(selfie_path, doc_path)
