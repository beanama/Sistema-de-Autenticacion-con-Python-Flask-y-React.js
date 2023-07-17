"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def user_signup():

    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    user = User(
        email=email,
        password=password,
        is_active=True
    )

    db.session.add(user)
    db.session.commit()

    response_body = {
        "user": user.serialize(),
    }

    return jsonify(response_body), 201


@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email, password=password)

    if user is None:
        return jsonify({"msg": "Email o contraseña incorrectos"}), 401
    
    access_token = create_access_token(identity=user.email)
    return jsonify({ "token": access_token, "user_email": user.email })


@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email")
    password = request.json.get("password")

    access_token = create_access_token(identity=email)

    response_body = {
        "access_token": access_token,
    }

    return jsonify(response_body), 201


@api.route("/dashboard", methods=["GET"])
@jwt_required()
def dashboard():

    current_user_id = get_jwt_identity()
    user = User.filter.get(current_user_id)

    return jsonify({"id": user.id, "email": user.email }), 200

