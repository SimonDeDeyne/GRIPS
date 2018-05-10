from flask_wtf import FlaskForm
from wtforms import SelectField,StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired


class ProfileForm(FlaskForm):  
    age = SelectField('Age', choices=[(x, x) for x in range(14, 90)], coerce=int,validators=[DataRequired()])   
    gender = SelectField('Gender', choices = [(0,'Choose your gender'),('Fe','Female'),('Ma','Male'),('x','X')],validators=[DataRequired()])        
    language = SelectField('Language', choices = [(0,'Choose your native language'),('En','English'),('X','Other')],validators=[DataRequired()])
    submit = SubmitField('Proceed')    


# class ExperimentForm(FlaskForm):
#     submit = SubmitField('Proceed')    