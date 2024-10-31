from flask import Flask, request, jsonify, render_template
import sys
import io
import json
from models.classifier import EnhancedClassifier
import numpy as np 

app = Flask(__name__)
classifier = None

def initialize_classifier():
    global classifier
    try:
        classifier = EnhancedClassifier()
    except Exception as e:
        print(f"Error initializing classifier: {str(e)}")
        raise

def process_quiz_answers(raw_answers):
    """
    Process and validate quiz answers into the correct format
    Returns a dictionary with question_id (int) as key and answer (str) as value
    """
    processed_answers = {}
    try:
        # Handle both array of objects and direct dictionary formats
        if isinstance(raw_answers, list):
            for answer in raw_answers:
                q_id = int(answer['question_id'])
                ans_value = str(answer['answer'])
                processed_answers[q_id] = ans_value
        elif isinstance(raw_answers, dict):
            for q_id, ans_value in raw_answers.items():
                processed_answers[int(q_id)] = str(ans_value)
        else:
            raise ValueError("Invalid answer format")
        
        # Validate answer values
        for q_id, ans_value in processed_answers.items():
            if not (1 <= int(ans_value) <= 5):
                raise ValueError(f"Invalid answer value for question {q_id}: {ans_value}")
            
    except Exception as e:
        raise ValueError(f"Error processing answers: {str(e)}")
        
    return processed_answers

with app.app_context():
    initialize_classifier()

@app.route('/')
def home():
    try:
        questions = classifier.quiz_manager.get_questions()
        return render_template(
            'quiz.html',
            quiz_data=json.dumps(questions)
        )
    except Exception as e:
        print(f"Error loading quiz: {str(e)}")
        return f"Error loading quiz: {str(e)}", 500

@app.route('/get_questions', methods=['GET'])
def get_questions():
    try:
        questions = classifier.quiz_manager.get_questions()
        return jsonify(questions)
    except Exception as e:
        print(f"Error fetching questions: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/submit_quiz', methods=['POST'])
def submit_quiz():
    try:
        # Capture the standard output
        output = io.StringIO()
        sys.stdout = output

        # Get raw answers from request
        raw_answers = request.json
        print(f"Raw answers received: {raw_answers}")

        # Process and validate answers
        try:
            processed_answers = process_quiz_answers(raw_answers)
            print(f"Processed answers: {processed_answers}")
        except ValueError as e:
            return jsonify({"error": str(e)}), 400

        # Verify we have answers for all questions
        expected_questions = set(range(1, 23))  # Questions 1-22
        if not all(q_id in processed_answers for q_id in expected_questions):
            return jsonify({"error": "Missing answers for some questions"}), 400

        # Get predictions and explanations
        results = classifier.predict(processed_answers)
        print(f"Classifier results: {results}")

        # Ensure we have valid predictions
        if not results.get("predictions"):
            return jsonify({"error": "No predictions generated"}), 500

        # Get alternative suggestions
        # alternatives = classifier.llm_manager.generate_alternative_suggestions(
        #     classifier.quiz_manager._generate_rag_query(processed_answers),
        #     [pred['department'] for pred in results['predictions'][:2]]
        # )

        # Format response for frontend
        response = {
            "predictions": results["predictions"],
            "explanation": results["llm_explanation"],
            # "alternatives": alternatives,
            "confidence_scores": {
                "rf_scores": dict(results["rf_departments"]),
                "rag_score": results["rag_result"].get("confidence", 0)
            }
        }

        print(f"Final response: {response}")

        # Reset the standard output
        sys.stdout = sys.__stdout__

        # Get the output and return it in the response
        command_line_output = output.getvalue()
        response["command_line_output"] = command_line_output
        
        return jsonify(response)
    except Exception as e:
        print(f"Error in submit_quiz: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/favicon.ico')
def favicon():
    return '', 204

if __name__ == "__main__":
    with app.app_context():
        initialize_classifier()
    app.run(debug=False)