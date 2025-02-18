from pydantic_settings import BaseSettings  # ✅ Correct import


class Config(BaseSettings):
    MODEL_NAME: str = "anup069/results"  # Hugging Face model path
    API_TITLE: str = "Fake News Detection API"
    API_VERSION: str = "1.0"
    
    class Config:
        env_file = ".env"  


config = Config()
