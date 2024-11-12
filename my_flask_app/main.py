from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
from sqlalchemy import text
import datetime
from config import Config, db 
from gets.endpoints_get import select_alunos, select_aluno, select_sala, select_dados_da_sala, select_professor, select_avaliacao, select_avaliacoes, select_notificacoes, select_notificacao, select_prox_aula
from posts.endpoints_jwt import  autenticar_usuario, token_required
from posts.endpoints_posts import  enviar_cobranca, adicionar_avaliacao

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
    return select_avaliacoes()

@app.route('/avaliaçao/<int:matricula>', methods=['GET'])
def get_avaliacao(matricula): 
    return select_avaliacao(matricula)

@app.route('/avaliaçao', methods=['POST'])
def insert_avalicao():
    return adicionar_avaliacao()

@app.route('/login', methods=['POST'])
def login():
    data = request.json 
    return autenticar_usuario(data)   


@app.route('/verificar_token', methods=['GET'])
@token_required
def verificar_token(data):
    return jsonify({'message': 'Token é válido!', 'data': data})

@app.route('/notificacao', methods=['GET'])
def get_notificacoes():
    return select_notificacoes()

@app.route('/notificacao/<int:matricula>', methods=['GET'])
def get_notificacao(matricula):
    return select_notificacao(matricula)

@app.route('/aula', methods=['GET'])
def get_prox_aula():
    return select_prox_aula()


@app.route('/cobranca', methods=['POST'])
def conbraca():
    data = request.json
    return enviar_cobranca(data) 
    


if __name__ == '__main__':
    app.run(debug=True)
