from sqlalchemy import text
from config import db, Config
from flask import request, jsonify
from functools import wraps
import datetime
import jwt


def autenticar_usuario(data): 
    matricula = data.get('matricula')
    senha = data.get('senha')

    if not matricula or not senha:
        return jsonify({'message': 'Matrícula e senha são obrigatórios!'}), 400

    
    query = text('SELECT * FROM verificar_usuario(:matricula, :senha)')
    result = db.session.execute(query, {'matricula': matricula, 'senha': senha}).fetchone()

    matricula = result[0]  
    status = result[1]

    if status == 'A':
        user = 'aluno'  
    elif status == 'P':
        user = 'professor' 
    elif status == 'D':
        user = 'adm'  
    elif status == 'E':
        user = 'expirado'
    else:
        user = 'desconhecido' 


    if result is None:
        return jsonify({'message': 'Credenciais inválidas!'}), 401

    # Cria o token JWT
    token = jwt.encode({
        'matricula': str(matricula),         
        'usuario': user,   
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=100)
    }, 'Config.SECRET_KEY') 

    return jsonify({'token': token})


# Função para verificar se o token é válido
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token')  # Ou use request.headers.get('Authorization') para o padrão Bearer Token
        if not token:
            return jsonify({'message': 'Token é necessário!'}), 403

        try:
            data = jwt.decode(token, 'Config.SECRET_KEY', algorithms=["HS256"])
            return f(data, *args, **kwargs)  # Passa os dados decodificados para a função original
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expirado!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token inválido!'}), 401

    return decorated