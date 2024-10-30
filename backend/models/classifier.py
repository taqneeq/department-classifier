import os
import pickle
import numpy as np
import pandas as pd
from typing import Dict, List, Any
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

from config_file import Config
from models.vector_store import VectorStore
from models.document_processor import DocumentProcessor
from models.quiz_manager import QuizManager
from models.llm_manager import LLMManager

class EnhancedClassifier:
    def __init__(self):
        self.rf_model = None
        self.label_encoder = None
        self.vector_store = None
        self.quiz_manager = QuizManager()
        self.llm_manager = LLMManager()
        
        self.load_models()
    
    def load_models(self):
        """Load or initialize all required models"""
        os.makedirs(Config.MODEL_PATH, exist_ok=True)
        
        # Try to load existing models first
        model_path = Config.RF_MODEL_FILE
        encoder_path = Config.LABEL_ENCODER_FILE

        
        if os.path.exists(model_path) and os.path.exists(encoder_path):
            try:
                print("Loading existing Random Forest model...")
                with open(model_path, 'rb') as f:
                    self.rf_model = pickle.load(f)
                with open(encoder_path, 'rb') as f:
                    self.label_encoder = pickle.load(f)
                print("Models loaded successfully!")
            except Exception as e:
                print(f"Error loading existing models: {str(e)}")
                print("Training new models...")
                self.train_models()
        else:
            print("No existing models found. Training new models...")
            self.train_models()
            
        self.vector_store = VectorStore()
        if not self.vector_store.load():
            print("Initializing vector store...")
            doc_processor = DocumentProcessor()
            pdf_chunks = doc_processor.process_documents()
            self.vector_store.initialize(pdf_chunks)
    
    def train_models(self):
        """Train Random Forest model using the dataset"""
        print("Training Random Forest model...")
        data = pd.read_csv('DataSet.csv')
        
        feature_columns = data.columns[2:].tolist()
        X = data[feature_columns]
        
        self.label_encoder = LabelEncoder()
        y = self.label_encoder.fit_transform(data["Choose The Department You're A Part of ?"])
        
        self.rf_model = RandomForestClassifier(n_estimators=100, max_depth=None, random_state=42)
        self.rf_model.fit(X, y)
        
        # Save the trained models
        print("Saving trained models...")
        with open(Config.RF_MODEL_FILE, 'wb') as f:
            pickle.dump(self.rf_model, f)
        with open(Config.LABEL_ENCODER_FILE, 'wb') as f:
            pickle.dump(self.label_encoder, f)

        print("Models saved successfully!")

    # Rest of the class remains the same...
    def predict(self, quiz_answers: Dict[int, str]) -> Dict[str, Any]:
        """Make predictions using RF, RAG, and LLM"""
        # Get RF predictions
        features = self.quiz_manager.encode_answers(quiz_answers)
        rf_pred_proba = self.rf_model.predict_proba(features)
        
        top_rf_indices = np.argsort(rf_pred_proba[0])[-3:][::-1]
        rf_departments = self.label_encoder.inverse_transform(top_rf_indices)
        rf_confidences = rf_pred_proba[0][top_rf_indices]
        
        # Get RAG predictions
        query_text = self.quiz_manager._generate_rag_query(quiz_answers)
        rag_result = self.vector_store.query(query_text)
        
        # Combine predictions
        final_predictions = self._combine_predictions(
            rf_departments, rf_confidences,
            rag_result.get("department_suggestions", []),
            rag_result.get("confidence", 0)
        )

        # Generate LLM explanation for top department
        top_dept = final_predictions[0]['department']
        dept_info = ' '.join([chunk['text'] for chunk in rag_result.get('similar_chunks', [])])
        
        llm_explanation = self.llm_manager.generate_department_explanation(
            department=top_dept,
            quiz_highlights=query_text,
            department_info=dept_info
        )
        
        return {
            "predictions": final_predictions,
            "rf_departments": list(zip(rf_departments, rf_confidences.tolist())),
            "rag_result": rag_result,
            "llm_explanation": llm_explanation
        }
    
    def _combine_predictions(self, rf_depts, rf_confs, rag_depts, rag_conf) -> List[Dict]:
        """Combine predictions from both models"""
        department_scores = {}
        
        for dept, conf in zip(rf_depts, rf_confs):
            department_scores[dept] = conf * Config.RF_WEIGHT
        
        for dept in rag_depts:
            if dept in department_scores:
                department_scores[dept] += rag_conf * Config.RAG_WEIGHT
            else:
                department_scores[dept] = rag_conf * Config.RAG_WEIGHT
        
        sorted_depts = sorted(department_scores.items(), key=lambda x: x[1], reverse=True)
        return [
            {
                "department": dept,
                "confidence": round(conf * 100, 2),
                "source": "Hybrid"
            }
            for dept, conf in sorted_depts
        ]