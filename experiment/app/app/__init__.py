from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_debugtoolbar import DebugToolbarExtension


app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
app.config.from_object(Config)

db = SQLAlchemy(app)
toolbar = DebugToolbarExtension(app)

from app import routes, models
