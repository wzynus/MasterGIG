from .db import db
from .UserEntity import UserEntity
from datetime import datetime




class GigEvent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    gig_request = db.relationship('GigRequest', lazy='dynamic')
    requester_id = db.Column(db.Integer, db.ForeignKey(UserEntity.id))
    content_creator_id = db.Column(db.Integer, db.ForeignKey(UserEntity.id))
    status = db.Column(db.String, default='upcoming')

    def __repr__(self):
        return '<GigEvent {}>'.format(self.id)

    def set_status_pending_feedback(self):
        self.status = 'pending feedback'

    def set_status_complete(self):
        self.status = 'complete'
