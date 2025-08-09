import firebase_admin
from firebase_admin import firestore, credentials

# Initialize Firebase
cred = credentials.Certificate("/home/berti/Desktop/neurocare-main/backend/service_filee.json")
firebase_admin.initialize_app(cred)

# Firestore client
db = firestore.client()
