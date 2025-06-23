from flask import Flask
from routes.authRoutes import auth_bp
from routes.predictRoutes import predict_bp
from routes.recommendations import recommendation_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(predict_bp, url_prefix='/prediction')
app.register_blueprint(recommendation_bp, url_prefix='/recommendations')

if __name__ == '__main__':
    app.run(debug=True)
