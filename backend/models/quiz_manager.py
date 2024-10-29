from typing import Dict, List
import numpy as np

class QuizManager:
    def __init__(self):
        """
        Initialize the QuizManager with predefined questions and weights.
        """
        self.questions = [
            {"id": 1, "text": "I find it easy to connect with new people in different situations.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 2, "text": "I often find myself expressing ideas clearly to others.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 3, "text": "I enjoy working on creative projects that involve visual elements.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 4, "text": "I enjoy solving problems using technical skills or tools.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 5, "text": "I often help others see things from my perspective.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 6, "text": "I enjoy coming up with new and different ideas.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 7, "text": "I approach challenges by finding practical solutions.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 8, "text": "I like thinking about new concepts for fun activities or games.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 9, "text": "I enjoy building relationships that could be beneficial for future projects.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 10, "text": "I'm often involved in discussions where I seek a favorable outcome.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 11, "text": "I enjoy helping guests feel comfortable in different settings.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 12, "text": "I stay updated on what's popular in social media and online trends.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 13, "text": "I often find myself organizing tasks or events effectively.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 14, "text": "I frequently commute by driving.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 15, "text": "I have a good sense of what makes a social media post engaging.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 16, "text": "I like putting my ideas on paper or digital sketches.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 17, "text": "I keep myself informed about the latest developments in technology.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 18, "text": "I am often involved in managing budgets or financial tasks.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 19, "text": "I enjoy writing and crafting compelling messages.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 20, "text": "I often think about innovative event ideas related to technology.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 21, "text": "I enjoy capturing moments through photography or videography.", "options": ["1", "2", "3", "4", "5"]},
            {"id": 22, "text": "I have a network of people involved in various committees.", "options": ["1", "2", "3", "4", "5"]}
        ]

        
    def get_questions(self) -> List[Dict]:
        return self.questions
    
    def encode_answers(self, answers: Dict[int, str]) -> np.ndarray:
        """Convert quiz answers to model input format"""
        features = np.zeros(len(self.questions))
        for question_id, answer in answers.items():
            features[question_id - 1] = float(answer)
        return features.reshape(1, -1)

    def _generate_rag_query(self, quiz_answers: Dict[int, str]) -> str:
        """Generate a natural language query for the RAG model based on quiz answers"""
        high_scores = []
        for q_id, score in quiz_answers.items():
            if float(score) >= 4:
                question = next(q for q in self.questions if q["id"] == q_id)
                high_scores.append(question["text"])
        
        query = "I am looking for a department that matches my skills and interests. "
        query += "I am particularly strong in: " + ", ".join(high_scores)
        return query