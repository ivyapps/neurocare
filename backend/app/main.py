from flask import Flask, jsonify, request
from flask_cors import CORS
from database import db
from utils import calculate_scores
from firebase_admin import firestore

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/')
def hello():
    return "Hello world"

@app.route('/api/submit', methods=['POST'])
def submit_answers():
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['name', 'email', 'gender', 'answers', 'condition']
        if not all(k in data for k in required_fields):
            return jsonify({"error": "Missing required fields"}), 400
        
        # Validate answer values
        valid_answers = {"Strongly Agree", "Agree", "Disagree", "Strongly Disagree", "I Don't Know"}
        if not all(v in valid_answers for v in data['answers'].values()):
            return jsonify({"error": "Invalid answer values"}), 400

        # Calculate results for the specified condition
        results = calculate_scores(data['answers'], data['condition'])
        
        # Save to Firestore 'users' collection
        user_ref = db.collection("users").document(data['email'])
        user_ref.set({
            'name': data['name'],
            'email': data['email'],
            'gender': data['gender'],
            'answers': data['answers'],
            'results': results,
            'timestamp': firestore.SERVER_TIMESTAMP
        }, merge=True)
        
        return jsonify({
            "message": "Assessment saved successfully",
            "results": results
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/user/<email>', methods=['GET'])
def get_user(email):
    try:
        doc = db.collection("users").document(email).get()
        if not doc.exists:
            return jsonify({"error": "User not found"}), 404
            
        return jsonify(doc.to_dict()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/questions/<conditions>', methods=['GET'])
def get_questions(conditions):
    try:
        doc = db.collection("Conditions").document(conditions).get()
        if not doc.exists:
            return jsonify({"error": "Condition not found"}), 404
        data = doc.to_dict()
        questions = data.get('questions', [])  # Get the questions array, default to empty if not found
        if not isinstance(questions, list):
            return jsonify({"error": "Questions field is not an array"}), 400
        return jsonify(questions), 200  # Return only the questions array
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)