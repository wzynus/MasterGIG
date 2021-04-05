from flask import Blueprint, jsonify, session, request
from app.models import UserEntity,db


content_routes = Blueprint('content', __name__)