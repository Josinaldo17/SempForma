 
from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
import datetime
from functools import wraps

app = Flask(__name__)

# Chave secreta para codificação do JWT
app.config['SECRET_KEY'] = 'Sempreemforma'

# Ativa o CORS para todas as rotas
CORS(app)

# Simulação de um banco de dados de usuários
usuarios = {
    "usuario1": "senha1",  # Usuário: senha
    "usuario2": "senha2"
}

# Decorador para verificar o token JWT
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token')  # Token deve ser enviado na query string
        if not token:
            return jsonify({'message': 'Token é necessário!'}), 403

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({'message': 'Token inválido!'}), 403

        return f(*args, **kwargs)

    return decorated

# Rota de login
@app.route('/login', methods=['POST'])
def login():
    auth = request.json

    username = auth.get('username')
    password = auth.get('password')

    if username not in usuarios or usuarios[username] != password:
        return jsonify({'message': 'Credenciais inválidas!'}), 401

    token = jwt.encode({'user': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                        app.config['SECRET_KEY'])

    return jsonify({'token': token})

# Rota protegida
@app.route('/protected', methods=['GET'])
@token_required
def protected():
    return jsonify({'message': 'Acesso autorizado! Você está acessando a rota protegida.'})

if __name__ == '__main__':
    app.run(debug=True)
