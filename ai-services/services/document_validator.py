import base64
from utils.openai_request import send_gpt_request
from flask import jsonify, abort
from models.ia_message_data import Message
import json


def validate_rg_document(caminho_imagem):
    # Codificar a imagem em base64
    with open(caminho_imagem, "rb") as f:
        imagem_codificada = base64.b64encode(f.read()).decode("utf-8")
        
    messages=[
        {
            "role": "system",
            "content": "Você é um especialista em documentos brasileiros e análise de RGs."
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": (
                        "Analise a imagem de um RG brasileiro. "
                        "e com base no modelo, se tem foto, assinatura e impressão digital diga se o documento é legítimo ou não. "
                        "Responda no seguinte formato JSON:\n\n"
                        "{\n"
                        "  \"documentStatus\": verified  // ou rejected\n"
                        "  \"documentReport\": \"\" // Se inválido, explique o motivo (máximo de 200 caracteres)\n"
                        "}"
                    )
                },
                {
                    "type": "image_url",
                    "image_url": {
                    "url": f"data:image/png;base64,{imagem_codificada}"
                    }
                }
            ]
        }
    ]
        
    response_content = send_gpt_request(messages)
    
    try:
        response_json = json.loads(response_content)
    except json.JSONDecodeError:
        abort(400, description="Erro ao processar a resposta do modelo. Tente novamente.")

    return response_json
