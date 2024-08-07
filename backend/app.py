from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from extensions import db, jwt
from routes import auth_bp, user_bp
from config import Config

app = Flask(__name__)
app.config.from_object(Config)


CORS(app)
db.init_app(app)
jwt.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
