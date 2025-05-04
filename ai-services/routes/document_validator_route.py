from fastapi import APIRouter, UploadFile, File, Form
from services.document_validator import validate_rg_document
from utils.file_utils import save_upload

router = APIRouter()

@router.post("/")
async def verify_identity(
    cpf: str = Form(...),
    document: UploadFile = File(...)
):
    doc_path = save_upload(document, f"{cpf}_document.jpg")
    return validate_rg_document(doc_path)