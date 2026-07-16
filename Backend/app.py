from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

USERS_FILE = 'users.json'

def read_users():
    if not os.path.exists(USERS_FILE):
        return []
    try:
        with open(USERS_FILE, 'r') as f:
            return json.load(f)
    except Exception:
        return []

def write_users(users):
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=4)

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    name = data.get('name')

    if not username or not password:
        return jsonify({"success": False, "message": "Username and password are required."}), 400

    users = read_users()
    
    # Check if a user already exists with the same username
    user_exists = next((u for u in users if u['username'] == username), None)

    if user_exists:
        return jsonify({"success": False, "message": "User already registered. Please login."})

    # Append new user to the list
    users.append({"username": username, "password": password, "name": name})
    write_users(users)

    return jsonify({"success": True, "message": "Registration successful! You can now login."})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"success": False, "message": "Username and password are required."}), 400

    users = read_users()
    
    # Check if the user exists in users.json
    user = next((u for u in users if u['username'] == username), None)

    if not user:
        return jsonify({"success": False, "message": "User not registered. Please sign up first."})

    if user['password'] != password:
        return jsonify({"success": False, "message": "Incorrect password. Please try again."})

    return jsonify({"success": True, "message": "Login successful!", "name": user.get('name', 'Farmer')})

@app.route('/reset_password', methods=['POST'])
def reset_password():
    data = request.json
    username = data.get('username')
    new_password = data.get('newPassword')

    if not username or not new_password:
        return jsonify({"success": False, "message": "Email and new password are required."}), 400

    users = read_users()
    
    user = next((u for u in users if u['username'] == username), None)

    if not user:
        return jsonify({"success": False, "message": "User not found."})

    user['password'] = new_password
    write_users(users)

    return jsonify({"success": True, "message": "Password reset successfully!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
