import google.generativeai as genai
from config_file import Config

class LLMManager:
    def __init__(self):
        genai.configure(api_key=Config.GOOGLE_API_KEY)
        self.model = genai.GenerativeModel(Config.GEMINI_MODEL)

    def generate_department_explanation(self, department, quiz_highlights, department_info):
        prompt = f"""
        Act as the head of a student led technology fest selecting members for the various departments.If a student is skilled with technical tools and loves problem solving and takes practical approach give priority to tech and collab
        Based on the following information:
        Student's Profile:
        {quiz_highlights}
        Department Information:
        {department_info}
        
        Please provide(from the department_info doc itself):
        1. A detailed explanation of why {department} would be a good fit for this student
        2. Key skills from their profile that align with the department
        3. Potential growth opportunities in this department
        4. Any additional advice for success in this role
        
        Keep the response professional, encouraging, and specific to the student's strengths also do not exceed more than 25 words of explanation.
        """
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Error generating explanation: {str(e)}"

    def generate_alternative_suggestions(self, quiz_profile, top_departments):
        prompt = f"""
        Based on the student's profile:
        {quiz_profile}
        
        And their top department matches:
        {', '.join(top_departments)}
        
        Please provide:
        1. Alternative departments they might consider
        2. Skills they could develop to be more successful
        3. General advice for their committee journey
        
        Keep suggestions practical and relevant to student committees.
        """

        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Error generating suggestions: {str(e)}"