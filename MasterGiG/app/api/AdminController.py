from flask import Blueprint, jsonify, session, request
from app.models import UserEntity,db






admin_routes = Blueprint('admin', __name__)