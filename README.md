# Backend
## Preview
This is a Flask-based backend for the Neurocare app.It connects to Google Firestore via the Firebase Admin SDK and exposes API endpoints to fetch questions and save responses.

## Features
- Serve questions from Firestore grouped by category.
- Sort questions in each group by a defined order.
- Accept and store user responses in Firestore with timestamps.
- CORS enabled for frontend access.

##  Installation
- Clone the repository

``` bash
git clone <repo-url>
cd neurocare/Backend
```
- Install dependencies
``` bash
pip install firebase-admin flask flask-cors
```
- Add your Firebase service account key
- Place your private_key.json in the project and update the path in:

``` python
cred = credentials.Certificate(r"C:\path\to\private_key.json")
```
- Running server
``` bash
python app.py
```
# Frontend
## Preview
This is a React Native questionnaire screen for the Neurocare app. It fetches grouped questions from a backend API, displays them one at a time with images, and allows users to submit their responses.

## Features
-Fetches questions from a Flask backend (/api/questions)
-Displays one question at a time, grouped into categories
-Shows an image for each question (from local assets)
-Tracks selected answers and prevents incomplete submissions
-Supports navigation:
-Back to previous question/group
-Next to next question/group
-Submit final answers to backend (/api/responses)
-Works with light/dark mode via Colors and useColorScheme

## Requirements
-React Native
-Expo Router
-A backend serving /api/questions and /api/responses
-Images stored in assets/images/questionimg/

- Running server
``` bash
npx expo start
```
(with keys matching imagekey in the backend question data)



