from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import UserEntity, db
#from app.models.models import UserEntity

def user_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = UserEntity.query.filter_by(email=email.data).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    bio = StringField('bio', validators=[DataRequired()])
    dob = StringField('dob', validators=[DataRequired()])
    profilePicUrl = StringField('profilePicUrl', validators=[DataRequired()])
