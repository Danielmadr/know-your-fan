import os
from dotenv import load_dotenv
from openai import OpenAI
from models.ia_message_data import Message

load_dotenv()
api_key = os.getenv('OPENAI_API_KEY')
model = os.getenv('OPENAI_API_MODEL')

client = OpenAI(api_key=api_key)

def send_gpt_request(request_data: list) -> Message:
  try:
    response = client.chat.completions.create(
        model= model,
        messages=request_data
    )
    return response.choices[0].message.content
  except Exception as e:
    # Log ou tratamento de erro pode ser adicionado aqui
    raise RuntimeError(f"Erro ao enviar requisição ao GPT: {str(e)}")