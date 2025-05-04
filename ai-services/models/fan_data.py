from pydantic import BaseModel
from typing import List, Optional
from fastapi import UploadFile
from datetime import datetime

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
    instagram: Optional[str] = None
    x: Optional[str] = None
    others: Optional[str] = None
    exclusiveContent: Optional[str] = None
    message: Optional[str] = None

    # Uploads (apenas adicionados no código, não validados pelo Pydantic)
    document: Optional[UploadFile] = None
    selfie: Optional[UploadFile] = None

    # IA / análise
    documentStatus: Optional[str] = None
    documentReport: Optional[str] = None
    selfieStatus: Optional[str] = None
    selfieMatchScore: Optional[float] = None
    fanStatus: Optional[str] = None

    fanType: Optional[str] = None
    engagementScore: Optional[int] = None
    contentPreference: Optional[str] = None
    potentialRevenue: Optional[str] = None
    recommendationSummary: Optional[str] = None
    personalChatbot: Optional[str] = None

    type: Optional[str] = None
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None
    fan_id: Optional[str] = None

    class Config:
        extra = "ignore"
