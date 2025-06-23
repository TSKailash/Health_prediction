from flask import Blueprint, request, jsonify
from pymongo import MongoClient
import bcrypt
from dotenv import load_dotenv
import os

load_dotenv()

mongo=os.getenv("MONGO_URI")

auth_bp = Blueprint('auth', __name__)

client = MongoClient(mongo)
db = client.healthpredict
users_collection = db.users

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if users_collection.find_one({"username": username}):
        return jsonify({"error": "User already exists"}), 409

    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    users_collection.insert_one({
        "username": username,
        "password": hashed
    })
    return jsonify({"message": "User created", "userId": username}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    user = users_collection.find_one({"username": username})
    if not user:
        return jsonify({"error": "User not found"}), 404

    if bcrypt.checkpw(password.encode('utf-8'), user["password"]):
        return jsonify({"message": "Login successful", "userId": username}), 200
    else:
        return jsonify({"error": "Incorrect password"}), 401
