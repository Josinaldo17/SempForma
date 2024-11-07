 
from sqlalchemy import text
from config import db  # Importa db de database.py
from flask import jsonify
import datetime
import jwt

def select_alunos():
    query = text('SELECT a.*, s.horario as horario FROM acad.aluno a INNER JOIN acad.salas s ON a.sala = s.id')
    result = db.session.execute(query)
    alunos = result.fetchall()

    resultado = jsonify([
        {
            'matricula': aluno[0],
            'nome': aluno[1],
            'cpf': aluno[2],
            'nive': aluno[3].isoformat(),
            'vencimento': aluno[4].isoformat(),
            'avaliacao': aluno[6],
            'sala': aluno[7],
            'telefone': aluno[8],
            'sexo': aluno[9],
            'altura': str(aluno[10]) if aluno[10] else None,
            'peso': str(aluno[11]) if aluno[11] else None,
            'data_insercao': aluno[12].isoformat(),
            'horario': aluno[13]
        } for aluno in alunos
    ])

    return resultado

def select_aluno(matricula):
    query = text('SELECT * FROM acad.aluno WHERE matricula = :matricula')
    result = db.session.execute(query, {'matricula': matricula})
    aluno = result.fetchone()
    
    if aluno:
        return jsonify({
            'matricula': aluno[0],
            'nome': aluno[1],
            'cpf': aluno[2],
            'nive': aluno[3].isoformat(),
            'vencimento': aluno[4].isoformat(),
            'avaliacao': aluno[6],
            'sala': aluno[7],
            'telefone': aluno[8],
            'sexo': aluno[9],
            'altura': str(aluno[10]) if aluno[10] else None,
            'peso': str(aluno[11]) if aluno[11] else None,
            'data_insercao': aluno[12].isoformat()
        })
    return jsonify({'message': 'Aluno não encontrado'}), 404

def select_professor():
    query = text('SELECT pr.*, ARRAY_AGG(s.horario) AS horarios FROM acad.professor pr LEFT JOIN acad.salas s ON s.matricula_professor = pr.matricula GROUP BY pr.matricula')
    result = db.session.execute(query)
    professores = result.fetchall()

    resultado = jsonify([
        {
            'matricula': prof[0],
            'nome': prof[1],
            'cpf': prof[2],
            'nive': prof[3].isoformat(),
            'senha': prof[4],
            'horarios':  prof[5]
        } for prof in professores
    ])

    return resultado


def select_sala():
    query = text('SELECT * FROM acad.salas')
    result = db.session.execute(query)
    salas = result.fetchall()
    
    resultado = jsonify([
        {
            'id': sala[0],
            'horario': sala[1],
            'matricula_professor': sala[2],
        } for sala in salas
    ])

    return resultado

def select_dados_da_sala(p_id_sala, p_dia):
    query = text('SELECT * FROM dados_da_sala(:id_sala, :dia)')
    result = db.session.execute(query, {'id_sala': p_id_sala, 'dia': p_dia})
    dados_sala = result.fetchall()
    resultado = jsonify([
        {
            'id': dado[0],
            'horario': dado[1],
            'dia': dado[2],
            'status': dado[3],
            'nome_professor': dado[4],
            'matricula_professor': dado[5],
            'nome_treino': dado[6],
            'alunos': dado[7]
        } for dado in dados_sala
    ])

    return resultado

def select_avaliacao():
    query = text('SELECT * FROM acad.avaliacao')
    result = db.session.execute(query)
    avaliacoes = result.fetchall()

    resultado = jsonify([
        {
            'id': avaliacao[0],
            'matricula_professor': avaliacao[1],
            'dia': avaliacao[2],
            'status': avaliacao[3],
            'pagamento': avaliacao[4],
            'matricula_aluno': avaliacao[5],
            'cintura': avaliacao[6],
            'braco_dc': avaliacao[7],
            'braco_d': avaliacao[8],
            'braco_ec': avaliacao[9],
            'braco_e': avaliacao[10],
            'coxa_d': avaliacao[11],
            'coxa_e': avaliacao[12],
            'pt_d': avaliacao[13],
            'pt_e': avaliacao[14],
            'torax': avaliacao[15],
            'obs': avaliacao[16],
            'imc': avaliacao[17],
            'gordura_corporal': avaliacao[18],
            'musculo_esqueletico': avaliacao[19],
            'metabolismo_repouso': avaliacao[20],
            'idade_bio': avaliacao[21],
            'gordura_visceral': avaliacao[22],
            'tempo_gravidez': avaliacao[23],
        } for avaliacao in avaliacoes
    ])

    return resultado

def select_notificacoes():
    query = text('SELECT * FROM acad.notificacao ORDER BY id DESC;')
    result = db.session.execute(query)
    mensagem = result.fetchall()

    resultado = jsonify([
        {
            'id': dados[0],
            'matricula_des': dados[1],
            'matricula_ori': dados[2],
            'tipo': dados[3],
            'mensagem': dados[4],
            'dia': dados[5]
        } for dados in mensagem
    ])

    return resultado

def select_notificacao(matricula):
    query = text('SELECT * FROM acad.notificacao WHERE matricula_des = :matricula OR matricula_des =  0 ORDER BY id DESC;')
    result = db.session.execute(query,{'matricula': matricula} )
    mensagem = result.fetchall()

    resultado = jsonify([
        {
            'id': dados[0],
            'matricula_des': dados[1],
            'matricula_ori': dados[2],
            'tipo': dados[3],
            'mensagem': dados[4],
            'dia': dados[5]
        } for dados in mensagem
    ])

    return resultado


def select_prox_aula():
    query = text('SELECT id, id_treino, id_sala, dia, status, professor FROM acad.aula WHERE status = :Pendente ORDER BY dia ASC LIMIT 1')
    result = db.session.execute(query,{'Pendente': 'Pendente'} )
    dados_aula = result.fetchall()

    resultado = jsonify([
        {
            'id': dado[0],
            'id_treino': dado[1],
            'id_sala': dado[2],
            'dia': dado[3],
            'status': dado[4],
            'professor': dado[5]
        } for dado in dados_aula
    ])

    return resultado