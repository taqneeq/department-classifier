import os
import pickle
from typing import Dict, List
from sentence_transformers import SentenceTransformer
from sklearn.neighbors import NearestNeighbors
from config_file import Config

class VectorStore:
    def __init__(self):
        self.embeddings = None
        self.chunks = None
        self.embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
        self.nearest_neighbors = None
        
    def load(self) -> bool:
        """Load existing embeddings if available"""
        try:
            with open(os.path.join(Config.CACHE_DIR, Config.EMBEDDINGS_FILE), 'rb') as f:
                saved_data = pickle.load(f)
                self.embeddings = saved_data['embeddings']
                self.chunks = saved_data['chunks']
                
            self.nearest_neighbors = NearestNeighbors(
                n_neighbors=Config.MAX_NEIGHBORS, 
                metric='cosine'
            )
            self.nearest_neighbors.fit(self.embeddings)
            return True
        except Exception:
            return False
            
    def initialize(self, chunks: List[Dict]):
        """Initialize vector store with new document chunks"""
        self.chunks = chunks
        
        texts = [chunk['text'] for chunk in chunks]
        self.embeddings = self.embedding_model.encode(texts)
        
        self.nearest_neighbors = NearestNeighbors(
            n_neighbors=Config.MAX_NEIGHBORS,
            metric='cosine'
        )
        self.nearest_neighbors.fit(self.embeddings)
        
        os.makedirs(Config.CACHE_DIR, exist_ok=True)
        with open(os.path.join(Config.CACHE_DIR, Config.EMBEDDINGS_FILE), 'wb') as f:
            pickle.dump({
                'embeddings': self.embeddings,
                'chunks': self.chunks
            }, f)
            
    def query(self, query_text: str) -> Dict:
        """Query the vector store for relevant chunks"""
        query_embedding = self.embedding_model.encode([query_text])[0]
        
        distances, indices = self.nearest_neighbors.kneighbors(
            [query_embedding],
            return_distance=True
        )
        
        similar_chunks = []
        for dist, idx in zip(distances[0], indices[0]):
            similarity = 1 - dist
            if similarity >= Config.SIMILARITY_THRESHOLD:
                similar_chunks.append({
                    'text': self.chunks[idx]['text'],
                    'metadata': self.chunks[idx].get('metadata', {}),
                    'similarity': similarity
                })
        
        departments = set()
        max_similarity = 0
        for chunk in similar_chunks:
            if 'department' in chunk['metadata']:
                departments.add(chunk['metadata']['department'])
                max_similarity = max(max_similarity, chunk['similarity'])
        
        return {
            'department_suggestions': list(departments),
            'confidence': max_similarity,
            'similar_chunks': similar_chunks
        }
