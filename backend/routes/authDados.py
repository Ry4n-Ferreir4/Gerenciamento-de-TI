from flask import Blueprint, request, jsonify
from extensions import db
from models import Item, TipoServico, Movimentacao, Servico, ServicoRealizado
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

authDados_bp = Blueprint('authDados', __name__)

# Helper function to convert model instances to dictionaries
def to_dict(model_instance):
    return {c.name: getattr(model_instance, c.name) for c in model_instance.__table__.columns}

# Item Routes
@authDados_bp.route('/items', methods=['GET'])
@jwt_required()
def get_items():
    items = Item.query.all()
    return jsonify([to_dict(item) for item in items])

@authDados_bp.route('/items', methods=['POST'])
@jwt_required()
def create_item():
    data = request.get_json()
    new_item = Item(nome=data['nome'], descricao=data['descricao'], quantidade=data['quantidade'])
    db.session.add(new_item)
    db.session.commit()
    return jsonify(to_dict(new_item)), 201

@authDados_bp.route('/items/<id>', methods=['PUT'])
@jwt_required()
def update_item(id):
    data = request.get_json()
    item = Item.query.get_or_404(id)
    item.nome = data['nome']
    item.descricao = data['descricao']
    item.quantidade = data['quantidade']
    db.session.commit()
    return jsonify(to_dict(item)), 200

@authDados_bp.route('/items/<id>', methods=['DELETE'])
@jwt_required()
def delete_item(id):
    item = Item.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return '', 204

# TipoServico Routes
@authDados_bp.route('/tiposervico', methods=['GET'])
@jwt_required()
def get_tiposervico():
    tipos = TipoServico.query.all()
    return jsonify([to_dict(tipo) for tipo in tipos])

@authDados_bp.route('/tiposervico', methods=['POST'])
@jwt_required()
def create_tiposervico():
    data = request.get_json()
    new_tipo = TipoServico(nome=data['nome'], descricao=data['descricao'])
    db.session.add(new_tipo)
    db.session.commit()
    return jsonify(to_dict(new_tipo)), 201

@authDados_bp.route('/tiposervico/<id>', methods=['PUT'])
@jwt_required()
def update_tiposervico(id):
    data = request.get_json()
    tipo = TipoServico.query.get_or_404(id)
    tipo.nome = data['nome']
    tipo.descricao = data['descricao']
    db.session.commit()
    return jsonify(to_dict(tipo)), 200

@authDados_bp.route('/tiposervico/<id>', methods=['DELETE'])
@jwt_required()
def delete_tiposervico(id):
    tipo = TipoServico.query.get_or_404(id)
    db.session.delete(tipo)
    db.session.commit()
    return '', 204

# Movimentacao Routes
@authDados_bp.route('/movimentacoes', methods=['POST'])
@jwt_required()
def create_movimentacao():
    data = request.get_json()
    current_user = get_jwt_identity()
    item = Item.query.get_or_404(data['item_id'])
    
    if data['tipo'] == 'Saída' and item.quantidade < data['quantidade']:
        return jsonify({'message': 'Quantidade insuficiente no estoque'}), 400

    if data['tipo'] == 'Entrada':
        item.quantidade += data['quantidade']
    elif data['tipo'] == 'Saída':
        item.quantidade -= data['quantidade']

    new_movimentacao = Movimentacao(
        data_solicitacao=datetime.utcnow(),
        tipo=data['tipo'],
        quantidade=data['quantidade'],
        item_id=data['item_id'],
        usuario_id=current_user
    )
    db.session.add(new_movimentacao)
    db.session.commit()
    
    return jsonify(to_dict(new_movimentacao)), 201

# Servico Routes
@authDados_bp.route('/servicos', methods=['GET'])
@jwt_required()
def get_servicos():
    servicos = Servico.query.all()
    return jsonify([to_dict(servico) for servico in servicos])

@authDados_bp.route('/servicos', methods=['POST'])
@jwt_required()
def create_servico():
    data = request.get_json()
    new_servico = Servico(nome=data['nome'], descricao=data['descricao'])
    db.session.add(new_servico)
    db.session.commit()
    return jsonify(to_dict(new_servico)), 201

@authDados_bp.route('/servicos/<id>', methods=['PUT'])
@jwt_required()
def update_servico(id):
    data = request.get_json()
    servico = Servico.query.get_or_404(id)
    servico.nome = data['nome']
    servico.descricao = data['descricao']
    db.session.commit()
    return jsonify(to_dict(servico)), 200

@authDados_bp.route('/servicos/<id>', methods=['DELETE'])
@jwt_required()
def delete_servico(id):
    servico = Servico.query.get_or_404(id)
    db.session.delete(servico)
    db.session.commit()
    return '', 204

# ServicoRealizado Routes
@authDados_bp.route('/servicosrealizados', methods=['POST'])
@jwt_required()
def create_servico_realizado():
    data = request.get_json()
    current_user = get_jwt_identity()
    new_servico_realizado = ServicoRealizado(
        data_realizacao=datetime.utcnow(),
        descricao=data['descricao'],
        servico_id=data['servico_id'],
        usuario_id=current_user
    )
    db.session.add(new_servico_realizado)
    db.session.commit()
    return jsonify(to_dict(new_servico_realizado)), 201
