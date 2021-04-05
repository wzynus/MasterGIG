from .db import db
from .UserEntity import UserEntity


class GigType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(140))
    description = db.Column(db.String(1000))
    cost = db.Column(db.Integer)
    owner = db.Column(db.Integer, db.ForeignKey(UserEntity.id))
    duration = db.Column(db.Interval)

    def __repr__(self):
        return '<GigType {}>'.format(self.title)