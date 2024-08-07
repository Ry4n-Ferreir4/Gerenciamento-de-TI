import uuid
from extensions import db

class Usuario(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=str(uuid.uuid4()))
    usuario = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    senha = db.Column(db.String(100), nullable=False)
    token_sessao = db.Column(db.String(255), nullable=True)
    token_validacao = db.Column(db.String(255), nullable=True)
    tipo_usuario = db.Column(db.String(20), nullable=False)  # Admin, Gestor, User
