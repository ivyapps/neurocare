import firebase_admin
from flask import Flask, jsonify, request
from flask_cors import CORS
from firebase_admin import credentials, firestore

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate("service_file.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
    
@app.route("/")
def home():
    return "Welcome to the Neurocare API!"

@app.route("/api/question", methods=['GET'])
def get_questions():
    user_ref = db.collection("questions")
    docs = user_ref.stream()

    all_questions = list(map(lambda doc: doc.to_dict(), docs))  #change it in such a way that it gets just the text part of the message
    return jsonify(all_questions)

@app.route('/api/response', methods=['POST'])
def responses():
    data = request.get_json()
    
    if not data:
        return jsonify({"error" : "No data received"}), 400
    
    try:
        doc_ref = db.collection('user_responses').add(data)[0]
        return jsonify({"success" : True}), 200     # "document_id" : doc_ref.id could be added at some point if needed. It helps the frontend get access to the different responses that are found within firestore
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({"error" : str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

