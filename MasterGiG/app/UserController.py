from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from app import app,db

from flask_jwt_extended import create_access_token
from app.models import UserEntity




@app.route('/users/register', methods=['POST'])
def register():
    username = request.get_json()['username']
    bio = request.get_json()['bio']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    #created = datetime.utcnow() // we dont have this attribute
    print(email, password)
    user = UserEntity(username = username, email=email, password=password, bio = bio)
    db.session.add(user)
    db.session.commit()
    result = {
      "email" : email,
      "password" : password,
      }
    return jsonify({"result" : result})


@app.route('/users/login', methods=['POST'])
def login():
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""

    user = UserEntity.query.filter_by(email=email).first()
    if bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity = { 'email': user.email })
        result = jsonify({"token": access_token})
    else:
        result = jsonify({"error": "Invalid username and password"})
    return result

