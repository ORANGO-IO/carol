from flask import Flask
from flask_cors import CORS
from v2.main import base_blueprint
from v1.main import v1_blueprint

app = Flask(__name__)
CORS(app)

# registrar rotas
app.register_blueprint(base_blueprint) 
app.register_blueprint(v1_blueprint)   


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
