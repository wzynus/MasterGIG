from .db import db
from .UserEntity import UserEntity
from datetime import datetime



class GigRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    requester_id = db.Column(db.Integer)
    content_creator_id = db.Column(db.Integer, db.ForeignKey(UserEntity.id))
    status = db.Column(db.String, default='pending')
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    gig_type = db.relationship('GigType', lazy='dynamic')

    def __repr__(self):
        return '<GigRequest {}>'.format(self.id)
