from datetime import datetime
from app import db

class Participants(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    age = db.Column(db.Integer, index=True)
    gender = db.Column(db.String(2))
    language = db.Column(db.String(12))
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def __repr__(self):
        return '<Participant {}: age {}>'.format(self.id,self.age)


# Note: we keep it simple, and skip over use of foreign keys
class Responses(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    participantID = db.Column(db.Integer, index=True)    
    stimulus = db.Column(db.String(20), index=True)
    rating = db.Column(db.Integer, index=True)
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def __repr__(self):
        return '<Response {}: response {}>'.format(self.id,self.age)



db.create_all()
db.session.commit()