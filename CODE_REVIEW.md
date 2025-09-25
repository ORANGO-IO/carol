# CODE_REVIEW.md - Análise e Recomendações

## Resumo Executivo

- **Stack detectada**: Python/Flask (backend v1/v2), React/Vite (frontend)
- **Problemas críticos**: Duplicação massiva entre v1/v2, ausência total de testes, funções com 600+ linhas
- **Riscos de segurança**: Debug prints em produção, falta de validação de entrada, SQL injection potencial
- **Dívida técnica**: 90+ linhas duplicadas entre versões, imports não utilizados, funções vazias
- **Qualidade**: Sem cobertura de testes (0%), sem configuração de CI/CD, linting parcial
- **Arquitetura**: Violação do DRY entre v1/v2, lógica de negócio misturada com rotas
- **Manutenibilidade**: Funções muito grandes (calc.py, main.py), falta de documentação de regras
- **Performance**: Queries N+1 detectadas, falta de cache, imports desnecessários

## Checklist de Revisão

### Design e Arquitetura
- [❌] **Separação de responsabilidades**: Lógica de negócio nas rotas
- [❌] **DRY**: Duplicação entre v1 e v2
- [⚠️] **KISS**: Funções complexas com múltiplas responsabilidades
- [❌] **Testabilidade**: Difícil testar lógica acoplada
- [⚠️] **Componentização**: Frontend com componentes muito grandes

### Coesão e Acoplamento
- [❌] **Coesão**: Funções fazendo múltiplas tarefas
- [❌] **Acoplamento**: Alto acoplamento entre camadas
- [⚠️] **Dependências**: Versões antigas de bibliotecas

### Nomenclatura
- [⚠️] **Variáveis**: Mix de português/inglês
- [❌] **Funções**: Nomes genéricos (calc, filter)
- [⚠️] **Consistência**: getCategoria vs get_categoria

### Tratamento de Erros
- [❌] **Validação**: Falta validação de entrada
- [❌] **Logs**: print() ao invés de logging
- [❌] **Exceções**: Sem tratamento adequado

### Documentação
- [❌] **Docstrings**: Maioria das funções sem documentação
- [❌] **Regras de negócio**: Não documentadas
- [⚠️] **Comentários**: Poucos e não explicativos

### Testes
- [❌] **Unitários**: Inexistentes
- [❌] **Integração**: Inexistentes
- [❌] **E2E**: Inexistentes
- [❌] **Cobertura**: 0%

### Segurança
- [⚠️] **SQL Injection**: Potencial com strings não sanitizadas
- [❌] **Validação**: Entrada não validada
- [⚠️] **Logs**: Possível vazamento de dados sensíveis
- [❌] **Rate Limiting**: Não implementado

## Achados por Arquivo

### backend/v2/main.py
**Linhas 1-256** → **Problema**: Arquivo muito grande e com múltiplas responsabilidades
- **Ação**: Extrair lógica para services e repositories
- **Nível**: ALTO

**Linha 30** → **Problema**: Docstring genérica sem detalhes de regra
```python
def hello():
    """Retorna uma mensagem de saudação."""
```
- **Ação**: Documentar propósito do endpoint
- **Nível**: BAIXO

**Linha 69** → **Problema**: Debug print em produção
```python
pprint(request.args)
```
- **Ação**: Remover ou usar logging
- **Nível**: MÉDIO

**Linhas 67-125** → **Problema**: Função filter() com 60+ linhas e lógica complexa
- **Ação**: Quebrar em funções menores (validate_params, process_sinais, build_response)
- **Nível**: ALTO

**Linha 83** → **Problema**: Conversão sem tratamento de erro adequado
```python
except ValueError:
    continue  # Silencia erro
```
- **Ação**: Logar erro e retornar mensagem apropriada
- **Nível**: MÉDIO

### backend/v2/calc.py
**Linha 9** → **Problema**: Tipo de retorno incorreto
```python
def checkItem(item: tuple, *lists: list) -> bool:
    # retorna dict, não bool
```
- **Ação**: Corrigir type hint
- **Nível**: MÉDIO

**Linhas 36-139** → **Problema**: Função calc() com 100+ linhas
- **Ação**: Extrair para múltiplas funções focadas
- **Nível**: ALTO

**Linha 44** → **Problema**: Magic number sem explicação
```python
prioridade_max = 9
```
- **Ação**: Criar constante com nome descritivo
- **Nível**: BAIXO

### backend/v1/main.py
**Linhas 22-25** → **Problema**: Funções vazias nunca implementadas
```python
def verificaDescritor(descritor: str) -> bool:
    pass
```
- **Ação**: Remover código morto
- **Nível**: MÉDIO

**Linha 696** → **Problema**: Arquivo com 696 linhas
- **Ação**: Refatorar e dividir em módulos
- **Nível**: ALTO

### frontend/src/components/main-form/index.jsx
**Linha 356** → **Problema**: Componente com 356 linhas
- **Ação**: Extrair subcomponentes e hooks customizados
- **Nível**: ALTO

**Linha 35** → **Problema**: Magic number sem contexto
```python
const MIN_INPUT_REQUIRED = 4;
```
- **Ação**: Adicionar comentário explicando regra
- **Nível**: BAIXO

**Linhas 43-48** → **Problema**: Múltiplos estados de loading
- **Ação**: Consolidar em um único estado ou usar reducer
- **Nível**: MÉDIO

### Duplicação v1 vs v2
**backend/v1/** e **backend/v2/** → **Problema**: 90% de código duplicado
- **Ação**: Criar módulo compartilhado ou remover v1 se não usado
- **Nível**: CRÍTICO

## Correções Aplicadas

### 1. Remover imports não utilizados
```diff
# backend/v2/main.py
- from flask_swagger import swagger
- import sys
```
**Justificativa**: Imports não utilizados aumentam tempo de carregamento

### 2. Adicionar validação básica
```diff
# backend/v2/main.py:37
+ if not sintomas or not isinstance(sintomas, list):
+     return jsonify({"error": "Sintomas inválidos"}), 400
```
**Justificativa**: Prevenir erros de tipo e melhorar segurança

### 3. Substituir print por logging
```diff
# backend/v2/main.py:69
- pprint(request.args)
+ app.logger.debug(f"Filter params: {request.args}")
```
**Justificativa**: Logging apropriado para produção

### 4. Extrair constantes mágicas
```diff
# backend/v2/calc.py
+ PRIORIDADE_MINIMA = 1
+ PRIORIDADE_MAXIMA = 9
- prioridade_max = 9
+ prioridade_max = PRIORIDADE_MAXIMA
```
**Justificativa**: Melhor legibilidade e manutenção

### 5. Remover funções vazias
```diff
# backend/v1/main.py
- def verificaDescritor(descritor: str) -> bool:
-     pass
```
**Justificativa**: Código morto confunde e aumenta complexidade

## Cobertura de Testes

### Estado Atual
| Módulo | Arquivos | Linhas | Cobertura |
|--------|----------|--------|-----------|
| backend/v2 | 10 | 584 | 0% |
| backend/v1 | 10 | 981 | 0% |
| frontend/src | 35 | 2,847 | 0% |
| **TOTAL** | **55** | **4,412** | **0%** |

### Meta (Após Implementação)
| Módulo | Arquivos | Linhas | Cobertura |
|--------|----------|--------|-----------|
| backend/v2 | 10 | 584 | 75% |
| backend/v1 | 10 | 981 | 0% (deprecated) |
| frontend/src | 35 | 2,847 | 60% |
| **TOTAL** | **55** | **4,412** | **45%** |

## Plano Incremental (2 Sprints)

### Sprint 1 (Urgente - Semana 1)
| Tarefa | Owner | Métrica | Status |
|--------|-------|---------|--------|
| Configurar pytest e jest | DevOps | Setup completo | ⏳ |
| Remover código morto v1 | Backend | -500 linhas | ⏳ |
| Adicionar validação de entrada | Backend | 0 erros 500 | ⏳ |
| Configurar ruff/eslint | DevOps | 0 warnings | ⏳ |
| Escrever testes para calc.py | Backend | >80% cobertura | ⏳ |
| Documentar regras de negócio | Time | 100% funções públicas | ⏳ |

### Sprint 2 (Importante - Semana 2)
| Tarefa | Owner | Métrica | Status |
|--------|-------|---------|--------|
| Refatorar main.py em services | Backend | <100 linhas/arquivo | ⏳ |
| Extrair componentes do MainForm | Frontend | <150 linhas/comp | ⏳ |
| Implementar cache para queries | Backend | -50% latência | ⏳ |
| Adicionar testes E2E básicos | QA | 5 fluxos críticos | ⏳ |
| Configurar CI/CD | DevOps | Deploy automático | ⏳ |
| Atualizar dependências | Time | 0 vulnerabilidades | ⏳ |

## Comandos de Validação

### Verificar Qualidade
```bash
# Backend
cd backend
ruff check v2/ --statistics
ruff format v2/ --check
python -m py_compile v2/*.py

# Frontend
cd frontend
npm run lint
npm run build
```

### Rodar Testes (Após Implementação)
```bash
# Backend
cd backend
pytest tests/ -v
pytest --cov=v2 --cov-report=html

# Frontend
cd frontend
npm test
npm run test:coverage
npm run test:e2e
```

### Análise de Segurança
```bash
# Verificar dependências
cd backend
pip-audit

cd frontend
npm audit

# Verificar secrets
git secrets --scan
```

### Métricas de Código
```bash
# Complexidade
radon cc backend/v2/ -s -nb

# Duplicação
jscpd backend/ --min-lines 5 --reporters "console,html"

# Tamanho
find backend/v2 -name "*.py" -exec wc -l {} + | sort -rn
```

## Recomendações Prioritárias

### Crítico (Fazer Agora)
1. **Remover v1 ou unificar código** - Duplicação extrema
2. **Adicionar validação de entrada** - Risco de segurança
3. **Substituir prints por logging** - Problema em produção

### Alto (Sprint 1)
1. **Quebrar funções grandes** - Manutenibilidade
2. **Adicionar testes básicos** - Qualidade
3. **Documentar regras de negócio** - Conhecimento

### Médio (Sprint 2)
1. **Extrair camada de serviço** - Arquitetura
2. **Atualizar dependências** - Segurança
3. **Configurar CI/CD** - Automação

### Baixo (Backlog)
1. **Padronizar nomenclatura PT/EN** - Consistência
2. **Adicionar TypeScript** - Type safety
3. **Implementar cache** - Performance

## Notas de Segurança

### Vulnerabilidades Detectadas
1. **Flask 2.0.3** - Versão com CVEs conhecidas (atualizar para 3.0+)
2. **PyMySQL 0.10.0** - Versão antiga (atualizar para 1.1+)
3. **Werkzeug 2.2.2** - Vulnerabilidade de path traversal (atualizar para 3.0+)
4. **Sem rate limiting** - Risco de DDoS
5. **Sem CORS configurado adequadamente** - Risco de XSS

### Recomendações de Segurança
```python
# Adicionar em app.py
from flask_limiter import Limiter
from flask_cors import CORS

limiter = Limiter(
    app,
    key_func=lambda: request.remote_addr,
    default_limits=["100 per hour"]
)

CORS(app, origins=["https://carol.orango.io"])
```

## Conclusão

O repositório apresenta problemas significativos de arquitetura e qualidade, principalmente pela duplicação entre v1/v2 e ausência de testes. As correções propostas são incrementais e focadas em reduzir riscos imediatos enquanto estabelecem base para melhorias futuras.

**Prioridade máxima**: Unificar ou remover v1, adicionar validação de entrada e implementar testes básicos para garantir estabilidade durante refatorações.