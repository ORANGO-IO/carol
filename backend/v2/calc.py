from flask import jsonify, Response
from .functions import get_classificacao, get_categoria_nome
from .utils.db import provide_session
from .models.queixas_principais import QueixasPrincipais
from .models.classificacao import Classificacao
from sqlalchemy.sql.expression import literal


def checkItem(item: tuple, *lists: list, vulnerabilidade: bool = False, sintomas_match: int = 0) -> dict:
    """Função checa se tem match de sinais em uma queixa principal e atribui pontuações.
    
    Regra de negócio expandida:
    - Pontuação baseada em quantidade de matches de sinais
    - Peso adicional para sintomas compatíveis
    - Bônus para pacientes vulneráveis
    - Peso inversamente proporcional à prioridade (menores = mais graves)
    
    Fórmula do score:
    score = (matches_de_sinais × 1) + 
            (matches_de_sintomas × 0.5) + 
            (bônus_por_vulnerabilidade) + 
            (bônus_por_prioridade: 5 / prioridade)
    """
    pontos = 0
    
    # Pontos por matches de sinais (1 ponto por lista)
    for lista in lists:
        if item in lista:
            pontos += 1
    
    # Pontos por matches de sintomas (0.5 ponto por sintoma)
    pontos += sintomas_match * 0.5
    
    # Bônus por vulnerabilidade (2 pontos se vulnerável)
    if vulnerabilidade:
        pontos += 2
    
    # Bônus inversamente proporcional à prioridade (gravidade)
    pontos += 5 / item[1]
    
    retorno = {"item": item, "pontos": pontos}
    return retorno

def intersection(*lists: list, vulnerabilidade: bool = False, sintomas_counts: dict = {}) -> dict:
    """Captura a intercessão de tuplas dentro de um array.
    
    Regra de negócio expandida:
    - Retorna todas as interseções ordenadas por pontuação
    - Considera sintomas compatíveis no cálculo do score
    - Aplica bônus para pacientes vulneráveis
    - Sugere as de maior prioridade (maior pontuação)
    """
    intersections = []
    for lista in lists:
        for tupla in lista:
            # Obter contagem de sintomas para esta queixa principal
            qp_id = tupla[0]
            sintomas_match = sintomas_counts.get(qp_id, 0) if sintomas_counts else 0
            
            intersections.append(
                checkItem(tupla, *lists, vulnerabilidade=vulnerabilidade, sintomas_match=sintomas_match)
            )

    # Excluindo dados repetidos e organizando-os do maior para o menor
    intersections = [dict(t) for t in {tuple(d.items()) for d in intersections}]
    intersections = sorted(intersections, key=lambda x: x["pontos"], reverse=True)
    sugestions = [
        item for item in intersections if item["pontos"] == intersections[0]["pontos"]
    ]

    return {"intersections": intersections, "sugestions": sugestions}

# Constantes de classificação de risco (Protocolo de Manchester)
PRIORIDADE_EMERGENCIA = 1      # Vermelho - Atendimento imediato
PRIORIDADE_MUITO_URGENTE = 2   # Laranja - 10 minutos
PRIORIDADE_URGENTE = 3         # Amarelo - 60 minutos
PRIORIDADE_POUCO_URGENTE = 4   # Verde - 120 minutos
PRIORIDADE_NAO_URGENTE = 5     # Azul - 240 minutos
PRIORIDADE_MINIMA = 9          # Sem classificação

@provide_session
def calc(filterData: dict, vulnerabilidade: bool = False, queixa_principal_id: int = 0, 
         sintomas_paciente: list = [], session=None) -> Response:
    """Função que calcula as prioridades e dá o resultado final.
    
    Regra de negócio expandida:
    - Calcula classificação de risco baseada nos sinais vitais e sintomas
    - Considera vulnerabilidades (gestante, idoso, criança)
    - Permite filtrar por queixa principal específica
    - Aumenta relevância para sintomas compatíveis
    - Promove classificação azul para verde em pacientes vulneráveis
    - Menor número de prioridade = maior urgência de atendimento
    """
    data = {}
    data["resultados"] = []
    qp_ids = []
    qp_classif_ids = []
    sintomas_counts = {}  # Contagem de sintomas por queixa principal
    for sinal in filterData:
        # Verificar qual a maior classificacao, prioridade 1 é a maior
        prioridade_max = PRIORIDADE_MINIMA
        qp_ids_sinal = []
        qp_classif_ids_sinal = []
        for match in sinal["matches"]:
            # Definindo o grau de gravidade máxima do sinal pesquisado

            for sintomas in match["sintomas_descritivos"]:
                if sintomas["prioridade_classificacao"] < prioridade_max:
                    prioridade_max = sintomas["prioridade_classificacao"]

            if match["classificacao"]["prioridade"] < prioridade_max:
                prioridade_max = match["classificacao"]["prioridade"]

            # Filtrar por queixa principal se especificada
            if queixa_principal_id and match["id_qp"] != queixa_principal_id:
                continue
                
            qp_ids_sinal.append(match["id_qp"])
            qp_classif_ids_sinal.append((match["id_qp"], match["id_classificacao"]))

            for sintomas in match["sintomas_descritivos"]:
                qp_classif_ids_sinal.append((match["id_qp"], sintomas["classificacao_id"]))

        qp_ids.append(qp_ids_sinal)
        qp_classif_ids.append(qp_classif_ids_sinal)
        sinal["matchesPrincipais"] = [
            x
            for x in sinal["matches"]
            if x["classificacao"]["prioridade"] == prioridade_max
        ]
        sinal["matchesSecundarios"] = sorted(
            [
                x
                for x in sinal["matches"]
                if x["classificacao"]["prioridade"] != prioridade_max
            ],
            key=lambda x: x["classificacao"]["prioridade"],
     )
    # Calcular contagem de sintomas por queixa principal se fornecidos
    if sintomas_paciente:
        from .models.sintomas import Sintomas
        from .models.queixas_sintomas_classificacao import QueixasSintomasClassificacao
        
        # Buscar IDs dos sintomas informados
        sintomas_ids = session.query(Sintomas.id).filter(
            Sintomas.sintoma.in_(sintomas_paciente)
        ).all()
        sintomas_ids = [s[0] for s in sintomas_ids]
        
        # Contar sintomas por queixa principal
        if sintomas_ids:
            counts = session.query(
                QueixasSintomasClassificacao.fk_queixa,
                literal(len(sintomas_ids)).label('count')
            ).filter(
                QueixasSintomasClassificacao.fk_sintoma.in_(sintomas_ids)
            ).group_by(QueixasSintomasClassificacao.fk_queixa).all()
            
            sintomas_counts = {qp_id: count for qp_id, count in counts}
    
    # Calcular interseções com suporte a vulnerabilidade e sintomas
    resultados = intersection(*qp_classif_ids, vulnerabilidade=vulnerabilidade, sintomas_counts=sintomas_counts)

    tmp_resultados = []
    for resultado in resultados["sugestions"]:
        fetch = (
            session.query(
                QueixasPrincipais.id,
                QueixasPrincipais.queixa_principal.label("sintoma"),
                QueixasPrincipais.observacoes.label("observacao"),
                QueixasPrincipais.fk_categoria.label("categoria"),
            )
            .filter(QueixasPrincipais.id == resultado["item"][0])
            .first()
        )

        if fetch:
            fetch = fetch._asdict()
        else:
            fetch = {}

        fetch["classificacao"] = resultado["item"][1]
        tmp_resultados.append(fetch)

    for resultado in tmp_resultados:
        classificacao_data = get_classificacao(resultado["classificacao"])
        resultado["classificacao"] = classificacao_data
        # Adicionar campos específicos para o frontend
        resultado["prioridade"] = classificacao_data.get("prioridade", 9)
        resultado["cor_hex"] = classificacao_data.get("cor_hex", "808080")
        if resultado.get("categoria"):
            resultado["categoria"] = get_categoria_nome(resultado["categoria"])

    data["resultados"] = tmp_resultados
    # Selecionar a triagem com maior prioridade (menor número de prioridade)
    if tmp_resultados:
        triagem_resultado = sorted(tmp_resultados, key=lambda x: x["prioridade"])[0]
        
        # Promover classificação azul para verde em pacientes vulneráveis
        if vulnerabilidade and triagem_resultado["prioridade"] == PRIORIDADE_NAO_URGENTE:
            # Atualizar para verde (pouco urgente)
            triagem_resultado["prioridade"] = PRIORIDADE_POUCO_URGENTE
            triagem_resultado["classificacao"]["prioridade"] = PRIORIDADE_POUCO_URGENTE
            triagem_resultado["classificacao"]["classificacao"] = "Verde"
            triagem_resultado["classificacao"]["tempo_atendimento"] = "120 minutos"
            triagem_resultado["cor_hex"] = "00C851"  # Verde
            
        data["triagem"] = triagem_resultado
    else:
        data["triagem"] = None

    sugestoes = []
    for qp in resultados["intersections"]:
        result = (
            session.query(
                QueixasPrincipais.id,
                QueixasPrincipais.queixa_principal.label("sintoma"),
                QueixasPrincipais.observacoes.label("observacao"),
                QueixasPrincipais.fk_categoria.label("categoria"),
                Classificacao.cor_hex.label("cor_hex"),
            )
            .outerjoin(Classificacao, literal(True))
            .filter(QueixasPrincipais.id == qp["item"][0])
            .filter(Classificacao.id == qp["item"][1])
            .first()
        )

        if result:
            result = result._asdict()
        else:
            result = {}
        sugestoes.append(result)

    data["sugestoes"] = sugestoes
    data["sinais"] = filterData

    return jsonify(data)