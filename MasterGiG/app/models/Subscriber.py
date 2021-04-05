
from .db import db
from .UserEntity import UserEntity

class Subscriber(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subscriber_id = db.Column(db.Integer, db.ForeignKey(UserEntity.id))
    subscribed_id = db.Column(db.Integer, db.ForeignKey(UserEntity.id))
    is_paid = db.Column(db.Boolean, default=False)
    expiry_date = db.Column(db.DateTime)
    renew_status = db.Column(db.Boolean, default=False)
    renew_date = db.Column(db.DateTime)

    def __repr__(self):
        return '<Subscriber {}>'.format(self.id)

    def set_renew_status(self, status):
        self.renew_status = status

    def set_renew_date(self, date):
        self.renew_date = date

    def set_expiry_date(self, date):
        self.expiry_date = date

    def toggle_paid_status(self):
        if self.is_paid:
            self.is_paid = False
        else:
            self.is_paid = True