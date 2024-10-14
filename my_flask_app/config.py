from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:cj17@localhost:5432/postgres'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'Sempreemforma'