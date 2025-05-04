from fastapi import APIRouter
from models.comments_data import CommentsRequest
from services.sentiment_analysis import analyze_sentiment_data

router = APIRouter()

@router.post("/")
async def analyze(request: CommentsRequest):
  return analyze_sentiment_data(request)