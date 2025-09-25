"""Testes para as funções de cálculo de classificação."""
import pytest
from unittest.mock import MagicMock, patch
import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from v2.calc import checkItem, intersection, PRIORIDADE_MINIMA

class TestCalcFunctions:
    """Testes para funções de cálculo."""
    
    def test_check_item_single_match(self):
        """Testa checkItem com um único match."""
        item = (1, 2)  # (id_qp, id_classificacao)
        lista1 = [(1, 2), (2, 3)]
        lista2 = [(3, 4)]
        
        result = checkItem(item, lista1, lista2)
        
        assert isinstance(result, dict)
        assert result["item"] == item
        assert result["pontos"] == 1 + 5/2  # 1 match + 5/id_classificacao
        
    def test_check_item_multiple_matches(self):
        """Testa checkItem com múltiplos matches."""
        item = (1, 2)
        lista1 = [(1, 2), (2, 3)]
        lista2 = [(1, 2), (3, 4)]
        lista3 = [(1, 2)]
        
        result = checkItem(item, lista1, lista2, lista3)
        
        assert result["pontos"] == 3 + 5/2  # 3 matches + 5/id_classificacao
        
    def test_intersection_empty_lists(self):
        """Testa intersection com listas vazias."""
        result = intersection([], [])
        
        assert isinstance(result, dict)
        assert "intersections" in result
        assert "sugestions" in result
        assert result["intersections"] == []
        assert result["sugestions"] == []
        
    def test_intersection_with_data(self):
        """Testa intersection com dados válidos."""
        lista1 = [(1, 2), (2, 3)]
        lista2 = [(1, 2), (3, 4)]
        
        result = intersection(lista1, lista2)
        
        assert len(result["intersections"]) == 4  # Total de itens únicos
        # Item (1,2) aparece em ambas listas, deve ter maior pontuação
        top_item = result["intersections"][0]
        assert top_item["item"] == (1, 2)
        assert top_item["pontos"] > 2  # Mais de 2 pontos por aparecer 2x
        
    def test_prioridade_constants(self):
        """Verifica se as constantes de prioridade estão definidas."""
        assert PRIORIDADE_MINIMA == 9
        assert hasattr(sys.modules['v2.calc'], 'PRIORIDADE_EMERGENCIA')
        assert hasattr(sys.modules['v2.calc'], 'PRIORIDADE_MUITO_URGENTE')

@patch('v2.calc.provide_session')
class TestCalcMain:
    """Testes para a função principal calc."""
    
    def test_calc_empty_filter(self, mock_session):
        """Testa calc com filtro vazio."""
        from v2.calc import calc
        
        # Mock da sessão
        session = MagicMock()
        mock_session.return_value = lambda f: f
        
        # Teste com filtro vazio
        result = calc({}, session=session)
        
        assert result is not None
        
    def test_calc_with_sinais(self, mock_session):
        """Testa calc com dados de sinais."""
        from v2.calc import calc
        
        session = MagicMock()
        mock_session.return_value = lambda f: f
        
        # Mock dos dados de entrada
        filter_data = {
            "temperatura": {
                "matches": [
                    {
                        "id_qp": 1,
                        "id_classificacao": 2,
                        "sintomas_descritivos": []
                    }
                ]
            }
        }
        
        # Configurar mocks de query
        session.query.return_value.filter.return_value.all.return_value = [
            MagicMock(id=1, queixa="Febre", classificacao=2)
        ]
        
        result = calc([filter_data], session=session)
        assert result is not None