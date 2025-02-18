from transformers import pipeline
from app.config import config
# Load the fine-tuned model
pipe = pipeline("text-classification", model=config.MODEL_NAME)

def predict_fake_news(text: str):
    prediction = pipe(text)[0]  
    
    if prediction["label"] in ["LABEL_0", "0"]:  # Adjust based on your model
        return {"label": "Fake News", "confidence": prediction["score"]}
    elif prediction["label"] in ["LABEL_1", "1"]:
        return {"label": "Real News", "confidence": prediction["score"]}
    else:
        return {"label": "Unknown", "confidence": prediction["score"]}  
