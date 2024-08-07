import uuid
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from models import Usuario
from extensions import db
from flask_jwt_extended import jwt_required, get_jwt_identity


auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
@jwt_required()
def register():
    current_user = get_jwt_identity()
    if current_user['tipo_usuario'] not in ['Admin', 'Gestor']:
        return jsonify({'message': 'Acesso negado'}), 403

    data = request.get_json()
    hashed_password = generate_password_hash(data['senha'], method='pbkdf2:sha256')
    
    new_user = Usuario(
        id=str(uuid.uuid4()),
        usuario=data['usuario'],
        email=data['email'],
        senha=hashed_password,
        tipo_usuario=data['tipo_usuario']
    )
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'Usuário registrado com sucesso'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = Usuario.query.filter_by(email=data['email']).first()
    
    if not user:
        print(f"Usuário não encontrado para email: {data['email']}")
        return jsonify({'message': 'Credenciais inválidas'}), 401

    if not check_password_hash(user.senha, data['senha']):
        print(f"Senha inválida para usuário: {data['email']}")
        return jsonify({'message': 'Credenciais inválidas'}), 401

    access_token = create_access_token(identity={'usuario': user.usuario, 'tipo_usuario': user.tipo_usuario})
    return jsonify(access_token=access_token), 200

@auth_bp.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    current_user = get_jwt_identity()
    return jsonify(current_user), 200