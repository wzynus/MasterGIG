from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from app import app,db


from app.models import UserEntity



@app.route('/api/uploadVideo', methods=['POST'])
def upload_video():
   return {'hello': 'world'}

    '''
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        uploaded_file.save(uploaded_file.filename)
    return redirect(url_for('index')) '''