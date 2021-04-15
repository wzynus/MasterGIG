from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from app import app,db


from app.models import UserEntity



'''
@app.route('/api/uploadVideo', methods=['POST'])
@cross_origin() 
def upload_video():
   request_data = request.get_json()
   print(request_data)
   return {'hello': 'world'}'''
@app.route('/api/uploadVideo', methods=['POST'])
#@cross_origin() 
def upload_video():
   data = request.json
   request_data = request.get_json()
   print(request_data)
   print(data)
   print('a')
   print("data is " + format(data))
   print("request_data is " + format(request_data))
   app.logger.info('Info level log')
   return {'hello': 'world'}