from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Usuario
from extensions import db

user_bp = Blueprint('user', __name__)

@user_bp.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    current_user = get_jwt_identity()
    if current_user['tipo_usuario'] != 'Admin':
        return jsonify({'message': 'Somente administradores podem acessar esta rota'}), 403

    users = Usuario.query.all()
    return jsonify([user.to_dict() for user in users])

@user_bp.route('/users/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    current_user = get_jwt_identity()
    if current_user['tipo_usuario'] != 'Admin':
        return jsonify({'message': 'Somente administradores podem acessar esta rota'}), 403

    user = Usuario.query.get(id)
    if not user:
        return jsonify({'message': 'Usuário não encontrado'}), 404

    data = request.get_json()
    user.usuario = data['usuario']
    user.email = data['email']
    user.tipo_usuario = data['tipo_usuario']
    db.session.commit()
    return jsonify({'message': 'Usuário atualizado com sucesso'})

@user_bp.route('/users/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    current_user = get_jwt_identity()
    if current_user['tipo_usuario'] != 'Admin':
        return jsonify({'message': 'Somente administradores podem acessar esta rota'}), 403

    user = Usuario.query.get(id)
    if not user:
        return jsonify({'message': 'Usuário não encontrado'}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Usuário deletado com sucesso'})

@user_bp.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    return jsonify({'message': 'Bem-vindo ao Dashboard'})

@user_bp.route('/gestor', methods=['GET'])
@jwt_required()
def gestor():
    current_user = get_jwt_identity()
    if current_user['tipo_usuario'] not in ['Admin', 'Gestor']:
        return jsonify({'message': 'Acesso negado'}), 403
    return jsonify({'message': 'Bem-vindo ao painel do Gestor'})

@user_bp.route('/admin', methods=['GET'])
@jwt_required()
def admin():
    current_user = get_jwt_identity()
    if current_user['tipo_usuario'] != 'Admin':
        return jsonify({'message': 'Acesso negado'}), 403
    return jsonify({'message': 'Bem-vindo ao painel do Admin'})
