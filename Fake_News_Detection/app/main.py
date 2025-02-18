from fastapi import FastAPI
from app.config import config
from app.models import NewsInput
from app.services import predict_fake_news

app = FastAPI(title=config.API_TITLE, version=config.API_VERSION)

@app.get("/")
def home():
    return {"message": f"{config.API_TITLE} is running!"}

@app.post("/verify/")
def verify_news(news: NewsInput):
    result = predict_fake_news(news.text)
    return {"text": news.text, "label": result["label"], "confidence": result["confidence"]}
