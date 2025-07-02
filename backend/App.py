import firebase_admin
from flask import Flask, jsonify
from flask_cors import CORS
from firebase_admin import credentials, firestore

app = Flask(__name__)
CORS(app)

cred = credentials.Certificate("service_file.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

try:
      db_ref = db.collection("questions").document("question1")
      db_ref.set({"question" : 1, "text" : "Do you have intense interests in specific topics that others might find unusual or obsessive?"})

      db_ref1 = db.collection("questions").document("question2")
      db_ref1.set({"id" : 2, "text" : "How old are you?"})
except Exception as e:
    print(f"Error: {e}")

@app.route("/api/question", methods=['GET'])
def get_questions():
    user_ref = db.collection("questions")
    docs = user_ref.stream()

    all_questions = list(map(lambda doc: doc.to_dict(), docs))  #change it in such a way that it gets just the text part of the message
    return jsonify(all_questions)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

