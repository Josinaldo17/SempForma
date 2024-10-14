from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
from sqlalchemy import text
import datetime
from config import Config, db 
from gets.endpoints_get import select_alunos, select_aluno, select_sala, select_dados_da_sala, select_professor, select_avaliacao
from posts.endpoints_jwt import  autenticar_usuario, token_required

app = Flask(__name__)
app.config.from_object(Config) 
CORS(app)
db.init_app(app)


@app.route('/alunos', methods=['GET'])
def get_alunos():
    return select_alunos()

@app.route('/alunos/<int:matricula>', methods=['GET'])
def get_aluno(matricula):
    return select_aluno(matricula)

@app.route('/professores', methods=['GET'])
def get_professores():
    return select_professor()

@app.route('/salas', methods=['GET'])
def get_sala():
    return select_sala()

@app.route('/salas/<int:id>/<string:dia>', methods=['GET'])
def get_dados_sala(id,dia):
    return select_dados_da_sala(id,dia)

@app.route('/avaliaçoes', methods=['GET'])
def get_avalicao():
    return select_avaliacao()

@app.route('/login', methods=['POST'])
def login():
    data = request.json 
    return autenticar_usuario(data)   


@app.route('/verificar_token', methods=['GET'])
@token_required
def verificar_token(data):
    return jsonify({'message': 'Token é válido!', 'data': data})


if __name__ == '__main__':
    app.run(debug=True)
