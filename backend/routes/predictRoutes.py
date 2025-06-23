from flask import Blueprint, request, jsonify
from pymongo import MongoClient
import pickle
import numpy as np
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()

mongo=os.getenv("MONGO_URI")


predict_bp = Blueprint('predict', __name__)

with open("model.pkl", "rb") as f:
    model = pickle.load(f)

client = MongoClient(mongo)
db = client.healthpredict
predictions_collection = db.predictions

@predict_bp.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print("Received data:", data)
    try:
        glucose = float(data["glucose"])
        bmi = float(data["bmi"])
        age = int(data["age"])
        bp = float(data["bp"])
        userId = data["userId"]
    except (KeyError, ValueError):
        return jsonify({"error": "Invalid input"}), 400

    features = np.array([[glucose, bmi, age, bp]])
    probability = model.predict_proba(features)[0][1]
    prediction = int(model.predict(features)[0])
    threshold = 0.6 
    prediction = 1 if probability >= threshold else 0


    result = {
        "userId": userId,
        "glucose": glucose,
        "bmi": bmi,
        "age": age,
        "bp": bp,
        "risk": "High" if prediction == 1 else "Low",
        "probability": round(probability, 2),
        "timestamp": datetime.now().isoformat()
    }

    predictions_collection.insert_one(result)

    return jsonify({
        "risk": result["risk"],
        "probability": result["probability"]
    }), 200

@predict_bp.route('/history/<userId>', methods=['GET'])
def history(userId):
    user_predictions = list(predictions_collection.find({"userId": userId}, {"_id": 0}))
    return jsonify(user_predictions), 200