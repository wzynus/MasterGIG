# Handle gig entity 
from flask import Blueprint, jsonify, session, request
from app.models import UserEntity,db




gig_routes = Blueprint('gig', __name__)