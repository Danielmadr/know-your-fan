from fastapi import APIRouter, Form, File, UploadFile, HTTPException
from models.fan_data import FanData
from services.fan_analysis import analyze_fan_data
from utils.file_utils import save_upload
import json

router = APIRouter()

@router.post("/", summary="Analisar perfil do fã")
async def analyze_fan(
    data: str = Form(..., description="JSON com os dados do fã"),
    document: UploadFile = File(..., description="Upload do documento do fã"),
    selfie: UploadFile = File(..., description="Upload da selfie do fã")
):
    # Parse do JSON recebido como string
    try:
        parsed_data = json.loads(data)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=400, detail=f"Erro no JSON de entrada: {str(e)}")

    # Cria objeto FanData com os dados e injeta os arquivos
    fan_data = FanData(**parsed_data)
    
    selfie_path = save_upload(selfie, f"{fan_data.cpf}_selfie.jpg")
    doc_path = save_upload(document, f"{fan_data.cpf}_document.jpg")
    
    

    # Chama o serviço de análise
    return analyze_fan_data(fan_data, selfie_path, doc_path)
