from sqlalchemy import text
from config import db
from flask import request, jsonify
from functools import wraps
import datetime
import jwt


def enviar_cobranca(data):
    matricula_adm = data.get('matricula_adm')
    matricula_aluno = data.get('matricula_aluno')

    if not matricula_adm or not matricula_aluno:
        return jsonify({'error': 'Matrícula do administrador e matrícula do aluno são obrigatórias.'}), 400


    try:
        query = text('SELECT alertaCobrança(:matricula_adm, :matricula_aluno)')
        db.session.execute(query, {'matricula_adm': matricula_adm, 'matricula_aluno': matricula_aluno})
        db.session.commit()
        
        return jsonify({'message': 'Requisicao de cobrança enviada com sucesso!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
def adicionar_avaliacao():
    try:
        # Dados enviados no corpo da requisição (JSON)
        dados = request.json

                # Certifique-se de que os valores numéricos estão sendo convertidos corretamente
        matricula_professor = int(dados['professorAvaliador'])
        matricula_aluno = int(dados['matricula'])
        cintura = float(dados['cintura'])
        braco_dc = float(dados['bracoDC'])        
        dia = dados['data']
        braco_d = float(dados['bracoD'])
        braco_ec = float(dados['bracoEC'])
        braco_e = float(dados['bracoE'])
        coxa_d = float(dados['coxaD'])
        coxa_e = float(dados['coxaE'])
        pt_d = float(dados['ptD'])
        pt_e = float(dados['ptE'])
        torax = float(dados['torax'])
        obs = dados['obs']
        imc = float(dados['imc'])
        gordura_corporal = float(dados['gorduraCorporal'])
        musculo_esqueletico = float(dados['musculoEsqueletico'])
        metabolismo_repouso = float(dados['metabolismoRepouso'])
        idade_bio = int(dados['idadeBiologica'])
        gordura_visceral = float(dados['gorduraVisceral'])

        # Consulta SQL com placeholders para valores
        query = text("""
            INSERT INTO acad.avaliacao (
                matricula_professor, dia, status, pagamento, matricula_aluno, 
                cintura, braco_dc, braco_d, braco_ec, braco_e, coxa_d, coxa_e, 
                pt_d, pt_e, torax, obs, imc, gordura_corporal, musculo_esqueletico, 
                metabolismo_repouso, idade_bio, gordura_visceral
            )
            VALUES (
                :matricula_professor, :dia,  'Concluido', 'Pago', :matricula_aluno, 
                :cintura, :braco_dc, :braco_d, :braco_ec, :braco_e, :coxa_d, :coxa_e, 
                :pt_d, :pt_e, :torax, :obs, :imc, :gordura_corporal, :musculo_esqueletico, 
                :metabolismo_repouso, :idade_bio, :gordura_visceral
            )
        """)

        db.session.execute(query, {
            'matricula_professor': matricula_professor,
            'matricula_aluno': matricula_aluno,
            'cintura': cintura,
            'braco_dc': braco_dc,
            'dia': dia,
            'braco_d': braco_d,
            'braco_ec': braco_ec,
            'braco_e': braco_e,
            'coxa_d': coxa_d,
            'coxa_e': coxa_e,
            'pt_d': pt_d,
            'pt_e': pt_e,
            'torax': torax,
            'obs': obs,
            'imc': imc,
            'gordura_corporal': gordura_corporal,
            'musculo_esqueletico': musculo_esqueletico,
            'metabolismo_repouso': metabolismo_repouso,
            'idade_bio': idade_bio,
            'gordura_visceral': gordura_visceral
        })
        db.session.commit()

        # Resposta de sucesso
        return jsonify({'message': 'Requisição de avaliação enviada com sucesso!'}), 200

    except Exception as e:
        print(f"Erro ao adicionar avaliação: {e}")
        return jsonify({f"message": "Erro ao adicionar avaliação {e}"}), 500