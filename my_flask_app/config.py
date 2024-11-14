from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

usuario = 'postgres'
senha = ''
porta = '5432'
host = 'localhost'
banco_de_dados = 'postgres'


class Config:
    SQLALCHEMY_DATABASE_URI = f'postgresql://{usuario}:{senha}@{host}:{porta}/{banco_de_dados}' 
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'Sempreemforma'
