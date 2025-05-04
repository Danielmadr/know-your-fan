from fastapi import FastAPI
from routes.fan_analysis_route import router as analysis_router
from routes.face_validator_route import router as face_router
from routes.sentiment_analysis_route import router as sentiment_router
from routes.document_validator_route import router as document_router

app = FastAPI(title="Know Your Fan AI API")

# Registrar rotas
app.include_router(analysis_router, prefix="/fanAnalyze", tags=["Analysis"])
app.include_router(face_router, prefix="/faceVerify", tags=["Verification"])
app.include_router(sentiment_router, prefix="/sentimentAnalyze", tags=["Sentiment Analysis"])
app.include_router(document_router, prefix="/documentVerify", tags=["Document Verification"])
