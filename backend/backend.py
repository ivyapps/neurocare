from flask import Flask, jsonify, request
import firebase_admin
from firebase_admin import credentials, firestore
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Firebase setup
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route('/questions', methods=['GET'])
def get_questions():
    questions_ref = db.collection('questions')
    docs = questions_ref.stream()
    questions = []
    for doc in docs:
        question_data = doc.to_dict()
        question_data['id'] = doc.id
        questions.append(question_data)
    return jsonify(questions)


@app.route('/submit', methods=['POST'])
def submit_answers():
    try:
        data = request.get_json()
        print("Received submission:", data)
        db.collection('submissions').add(data)
        return jsonify({"message": "Submission saved successfully."}), 200
    except Exception as e:
        print("Error saving submission:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
