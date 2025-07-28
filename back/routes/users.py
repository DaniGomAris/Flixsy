from flask import Blueprint, request, jsonify
from firebase_config import db
from utils.user_validator import UserValidator

users_bp = Blueprint("users", __name__)
validator = UserValidator(db)


@users_bp.route("/", methods=["GET"])
def get_users():
    users_ref = db.collection("user")
    docs = users_ref.stream()
    users = [{**doc.to_dict(), "id": doc.id} for doc in docs]
    return jsonify(users)


@users_bp.route("/", methods=["POST"])
def add_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    if not validator.is_valid_email(email):
        return jsonify({"error": "Invalid email format"}), 400
    
    if not validator.is_strong_password(password):
        return jsonify({"error": "Password too weak"}), 400
    
    if validator.is_email_registered(email):
        return jsonify({"error": "Email already registered"}), 409

    doc_ref = db.collection("user").add(data)
    return jsonify({"message": "User added", "id": doc_ref[1].id}), 201


@users_bp.route("/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    try:
        db.collection("user").document(user_id).delete()
        return jsonify({"message": "User deleted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@users_bp.route("/<user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.get_json()
    try:
        db.collection("user").document(user_id).update(data)
        return jsonify({"message": "User updated"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@users_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    try:
        users = db.collection("user").where("email", "==", email).stream()
        user = next(users, None)

        if user is None:
            return jsonify({"error": "User not found"}), 404

        user_data = user.to_dict()
        if user_data["password"] != password:
            return jsonify({"error": "Invalid password"}), 401

        return jsonify({**user_data, "id": user.id}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500