from flask import Flask
from flask_cors import CORS
from routes.users import users_bp
from routes.movies import movies_bp

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(users_bp, url_prefix="/users")
app.register_blueprint(movies_bp, url_prefix="/movies")

if __name__ == "__main__":
    app.run(debug=True)
