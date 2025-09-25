"""Testes para os endpoints da API v2."""
import pytest
from unittest.mock import MagicMock, patch
import json
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

class TestAPIEndpoints:
    """Testes para endpoints da API."""
    
    @patch('v2.main.provide_session')
    def test_hello_endpoint(self, mock_session):
        """Testa o endpoint de hello."""
        from v2.main import base_blueprint
        from flask import Flask
        
        app = Flask(__name__)
        app.register_blueprint(base_blueprint)
        
        with app.test_client() as client:
            response = client.get('/api/')
            assert response.status_code == 200
            assert b"Hello World from CAROL V2!" in response.data
    
    @patch('v2.main.provide_session')
    def test_sintomas_descritivos_sem_payload(self, mock_session):
        """Testa endpoint sintomas_descritivos sem payload."""
        from v2.main import base_blueprint
        from flask import Flask
        
        app = Flask(__name__)
        app.register_blueprint(base_blueprint)
        
        with app.test_client() as client:
            response = client.post('/api/sintomas_descritivos',
                                 content_type='application/json',
                                 data='{}')
            assert response.status_code == 400
            data = json.loads(response.data)
            assert "error" in data
    
    @patch('v2.main.provide_session')
    def test_sintomas_descritivos_com_dados_validos(self, mock_session):
        """Testa endpoint sintomas_descritivos com dados válidos."""
        from v2.main import base_blueprint
        from flask import Flask
        
        app = Flask(__name__)
        app.register_blueprint(base_blueprint)
        
        # Mock da sessão
        session = MagicMock()
        mock_session.return_value = lambda f: lambda *args, **kwargs: f(*args, session=session, **kwargs)
        
        payload = {
            "sintomas_descritivos": [
                {
                    "id_queixa": 1,
                    "id_classificacao": 2,
                    "id_sintoma": 3,
                    "descritor": "Dor intensa",
                    "revisado_por": "Dr. Silva"
                }
            ]
        }
        
        with app.test_client() as client:
            response = client.post('/api/sintomas_descritivos',
                                 content_type='application/json',
                                 data=json.dumps(payload))
            assert response.status_code in [200, 201]
    
    @patch('v2.main.provide_session')
    def test_filter_endpoint(self, mock_session):
        """Testa o endpoint de filtro."""
        from v2.main import base_blueprint
        from flask import Flask
        
        app = Flask(__name__)
        app.register_blueprint(base_blueprint)
        
        # Mock da sessão
        session = MagicMock()
        session.query.return_value.filter.return_value.all.return_value = []
        mock_session.return_value = lambda f: lambda *args, **kwargs: f(*args, session=session, **kwargs)
        
        with app.test_client() as client:
            response = client.get('/api/filter?temperatura=38&categoria=1')
            assert response.status_code == 200
    
    @patch('v2.main.provide_session')
    def test_qp_endpoint(self, mock_session):
        """Testa o endpoint de queixas principais."""
        from v2.main import base_blueprint
        from flask import Flask
        
        app = Flask(__name__)
        app.register_blueprint(base_blueprint)
        
        # Mock da sessão
        session = MagicMock()
        session.query.return_value.all.return_value = [
            MagicMock(id=1, queixa="Febre", fk_categoria=1)
        ]
        mock_session.return_value = lambda f: lambda *args, **kwargs: f(*args, session=session, **kwargs)
        
        with app.test_client() as client:
            response = client.get('/api/qp')
            assert response.status_code == 200
            data = json.loads(response.data)
            assert isinstance(data, list)

class TestValidation:
    """Testes de validação de entrada."""
    
    def test_processa_resultado(self):
        """Testa a função processa_resultado."""
        from v2.main import processa_resultado
        
        # Mock de resultado de query
        MockRow = type('MockRow', (), {
            '_asdict': lambda self: {'min': self.min, 'max': self.max},
            'min': 10,
            'max': 40
        })
        
        result = [MockRow()]
        
        # Valor dentro do range
        processed = processa_resultado(result, 25)
        assert len(processed) == 0  # Não deve incluir pois está dentro do range
        
        # Valor fora do range
        processed = processa_resultado(result, 50)
        assert len(processed) == 1  # Deve incluir pois está fora do range