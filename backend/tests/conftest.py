"""Configuração do pytest para testes do backend."""
import sys
import os
from pathlib import Path

# Adiciona o diretório backend ao path
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

# Configurações de teste
import pytest
from unittest.mock import MagicMock

@pytest.fixture
def mock_session():
    """Mock da sessão do banco de dados."""
    session = MagicMock()
    session.query.return_value = session
    session.filter.return_value = session
    session.all.return_value = []
    session.first.return_value = None
    return session

@pytest.fixture
def app_client():
    """Cliente de teste para a aplicação Flask."""
    from app import app
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@pytest.fixture
def sample_sinais():
    """Dados de exemplo de sinais vitais."""
    return {
        "temperatura": 38.5,
        "pressao_sistolica": 120,
        "pressao_diastolica": 80,
        "frequencia_cardiaca": 90,
        "frequencia_respiratoria": 18,
        "saturacao": 98,
        "glasgow": 15
    }

@pytest.fixture  
def sample_sintomas():
    """Dados de exemplo de sintomas."""
    return [
        {"id": 1, "nome": "Dor de cabeça", "intensidade": "moderada"},
        {"id": 2, "nome": "Febre", "intensidade": "alta"},
        {"id": 3, "nome": "Tosse", "intensidade": "leve"}
    ]