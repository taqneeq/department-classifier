import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    # Existing configs
    DATA_PATH = "data/departments"
    CHUNK_SIZE = 150
    CHUNK_OVERLAP = 100
    EMBEDDINGS_FILE = "embeddings.pkl"
    MAX_NEIGHBORS = 5
    SIMILARITY_THRESHOLD = 0.8
    CACHE_DIR = "cache"
    
    MODEL_PATH = "models"
    os.makedirs(MODEL_PATH, exist_ok=True) 
    RF_MODEL_FILE = os.path.join(MODEL_PATH, "random_forest_model.pkl") 
    LABEL_ENCODER_FILE = os.path.join(MODEL_PATH, "label_encoder.pkl")  
    
    # Weights for ensemble
    RF_WEIGHT = 0.3
    RAG_WEIGHT = 0.7

    # Gemini API Configuration
    GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')  # Read from .env file
    if not GOOGLE_API_KEY:
        raise ValueError("GOOGLE_API_KEY not found in environment variables. Please check your .env file.")
    GEMINI_MODEL = "gemini-pro"
    MAX_TOKENS = 1000

    @classmethod
    def validate_config(cls):
        if not cls.GOOGLE_API_KEY:
            raise ValueError("GOOGLE_API_KEY not found in environment variables. Please check your .env file.")