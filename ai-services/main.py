from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from pydantic import BaseModel
from typing import List, Optional
import secrets

app = FastAPI()
security = HTTPBasic()

# Simulação de usuário e senha
VALID_USERNAME = "furia_admin"
VALID_PASSWORD = "senha_secreta"

class FanData(BaseModel):
    fullName: str
    nickname: str
    email: str
    username: str
    password: str
    cpfDisplay: str
    cpf: str
    location: str
    socials: List[str]
    ecommerce: List[str]
    content: List[str]
    influencers: Optional[str] = None
    events: Optional[str] = None
    favoriteGame: Optional[str] = None
    faceit: Optional[str] = None
    hltv: Optional[str] = None
    others: Optional[str] = None
    exclusiveContent: Optional[str] = None
    message: Optional[str] = None

def verify_credentials(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, VALID_USERNAME)
    correct_password = secrets.compare_digest(credentials.password, VALID_PASSWORD)
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas",
            headers={"WWW-Authenticate": "Basic"},
        )

@app.post("/analyze")
async def analyze_fan(fan: FanData, credentials: HTTPBasicCredentials = Depends(verify_credentials)):
    fanType = "super fã" if len(fan.socials) > 3 and "Tudo que a FURIA posta, eu curto" in fan.content else "casual"
    engagementScore = min(100, len(fan.content) * 15)
    contentPreference = max(set(fan.content), key=fan.content.count) if fan.content else "Indefinido"
    potentialRevenue = "alto" if "Já comprei e uso com orgulho" in fan.ecommerce else "médio" if fan.ecommerce else "baixo"
    recommendationSummary = (
        f"{fan.fullName} é classificado como {fanType}. Gosta de conteúdo como '{contentPreference}' e interage em {len(fan.socials)} redes. "
        f"Potencial de monetização: {potentialRevenue}."
    )

    return {
        "fanType": fanType,
        "engagementScore": engagementScore,
        "contentPreference": contentPreference,
        "potentialRevenue": potentialRevenue,
        "recommendationSummary": recommendationSummary,
    }