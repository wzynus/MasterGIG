from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import UserEntity,db


user_routes = Blueprint('user', __name__)

