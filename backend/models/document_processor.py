import os
from typing import Dict, List
from config_file import Config

class DocumentProcessor:
    def __init__(self):
        self.departments_path = Config.DATA_PATH
        
    def process_documents(self) -> List[Dict]:
        """Process all department documents into chunks"""
        chunks = []
        
        for dept_name in os.listdir(self.departments_path):
            dept_path = os.path.join(self.departments_path, dept_name)
            if os.path.isdir(dept_path):
                dept_chunks = self._process_department(dept_path, dept_name)
                chunks.extend(dept_chunks)
                
        return chunks
    
    def _process_department(self, dept_path: str, dept_name: str) -> List[Dict]:
        """Process all documents for a single department"""
        chunks = []
        
        for filename in os.listdir(dept_path):
            if filename.endswith('.txt'):
                file_path = os.path.join(dept_path, filename)
                with open(file_path, 'r', encoding='utf-8') as f:
                    text = f.read()
                    
                doc_chunks = self._create_chunks(text)
                
                for chunk in doc_chunks:
                    chunks.append({
                        'text': chunk,
                        'metadata': {
                            'department': dept_name,
                            'source': filename
                        }
                    })
                    
        return chunks
    
    def _create_chunks(self, text: str) -> List[str]:
        """Split text into overlapping chunks"""
        chunks = []
        start = 0
        
        while start < len(text):
            end = start + Config.CHUNK_SIZE
            chunk = text[start:end]
            
            if end < len(text):
                last_period = chunk.rfind('.')
                if last_period != -1:
                    chunk = chunk[:last_period + 1]
                    end = start + last_period + 1
            
            chunks.append(chunk)
            start = end - Config.CHUNK_OVERLAP
            
        return chunks
