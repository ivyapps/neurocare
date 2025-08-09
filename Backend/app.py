import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask, jsonify, request
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize Firebase Admin SDK with your service account key JSON path
cred = credentials.Certificate(r"C:\Users\User\Desktop\neurocare\neurocare\Backend\private_key.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route("/")
def home():
    return "Welcome to Neurocare"

@app.route('/api/questions', methods=['GET'])
def questions_get():
    questions_ref = db.collection("questions")
    docs = questions_ref.stream()

    questions_by_group = {}

    for doc in docs:
        q = doc.to_dict()
        q_id = doc.id
        group = q.get('group', 'Ungrouped')  # Default group if not present

        if group not in questions_by_group:
            questions_by_group[group] = []

        questions_by_group[group].append({
            'id': q_id,
            'question': q.get('question', ''),
            'options': q.get('options', []),
            'imagekey': q.get('imagekey', ''),
            'order': q.get('order', 0)
        })

    # Sort questions inside each group by their 'order' property
    for group in questions_by_group:
        questions_by_group[group].sort(key=lambda x: x['order'])

    return jsonify({'groups': questions_by_group})

@app.route('/api/responses', methods=['POST'])
def save_responses():
    data = request.get_json()
    print("Received data:", data)  # Debug print

    if not data or 'answers' not in data:
        print("Invalid data received")
        return jsonify({'error': 'Invalid data'}), 400

    raw_answers = data['answers']
    structured_answers = []

    # Build structured answers with question text for each question id
    for question_id, selected_option in raw_answers.items():
        question_doc = db.collection("questions").document(question_id).get()
        if question_doc.exists:
            question_data = question_doc.to_dict()
            structured_answers.append({
                "question_id": question_id,
                "question": question_data.get("question", ""),
                "selected_option": selected_option
            })

    response_to_store = {
        "answers": structured_answers,
        "createdAt": firestore.SERVER_TIMESTAMP
    }

    try:
        doc_ref = db.collection('responses').add(response_to_store)
        print(f"Saved response with ID: {doc_ref[1].id}")  # Debug print
        return jsonify({'message': 'Responses saved successfully'}), 200
    except Exception as e:
        print(f"Error saving to Firestore: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Run on all interfaces, debug enabled for dev environment
    app.run(debug=True, host='0.0.0.0')
