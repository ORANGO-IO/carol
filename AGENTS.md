# AGENTS.md - Diretrizes de Engenharia e Operação

## Visão Geral

O **CAROL** é um sistema de triagem e classificação de risco médico que auxilia profissionais de saúde na tomada de decisões. O sistema possui duas versões da API (v1 e v2) e um frontend React para interface com o usuário.

### Papéis e Responsabilidades
- **Backend API (Flask)**: Processa sinais vitais, sintomas e queixas principais para calcular classificações de risco
- **Frontend (React)**: Coleta dados do paciente e exibe resultados de classificação
- **Banco de Dados (MySQL)**: Armazena queixas, sintomas, sinais e classificações médicas

### Fluxo Principal
1. Usuário insere dados do paciente e sinais vitais no frontend
2. Frontend envia requisição para API com sintomas/sinais
3. Backend calcula prioridade baseado em regras médicas
4. Sistema retorna classificação de risco (Azul/Verde/Amarelo/Laranja/Vermelho)

## Arquitetura e Estrutura de Pastas

```
carol.orango.io/
├── backend/               # API Flask
│   ├── v1/               # Versão 1 da API (legacy)
│   │   ├── models/       # Modelos SQLAlchemy
│   │   ├── utils/        # Utilitários (DB)
│   │   ├── calc.py       # Lógica de cálculo
│   │   ├── functions.py  # Funções auxiliares
│   │   └── main.py       # Rotas da API
│   ├── v2/               # Versão 2 da API (atual)
│   │   ├── models/       # Modelos SQLAlchemy
│   │   ├── utils/        # Utilitários (DB)
│   │   ├── calc.py       # Lógica de cálculo
│   │   ├── functions.py  # Funções auxiliares
│   │   └── main.py       # Rotas da API
│   ├── alembic/          # Migrações de banco
│   └── app.py            # Ponto de entrada
│
└── frontend/             # Interface React
    ├── src/
    │   ├── api/          # Chamadas à API
    │   ├── components/   # Componentes React
    │   ├── pages/        # Páginas da aplicação
    │   ├── store/        # Estado global (Jotai)
    │   └── utils/        # Funções utilitárias
    └── v1/               # Versão antiga (legacy)
```

## Princípios de Desenvolvimento

### DRY (Don't Repeat Yourself)
**Problema no repo**: Duplicação entre `v1/` e `v2/` no backend (calc.py, main.py, functions.py)
```python
# ❌ Evitar - código duplicado em v1/main.py e v2/main.py
def get_classificacao(id):
    # mesma lógica em dois arquivos
    
# ✅ Preferir - função compartilhada
# backend/shared/functions.py
def get_classificacao(id, version='v2'):
    # lógica unificada
```

### YAGNI (You Aren't Gonna Need It)
**Problema no repo**: Funções vazias e imports não utilizados
```python
# ❌ Evitar - backend/v1/main.py
def verificaDescritor(descritor: str) -> bool:
    pass  # Função nunca implementada

# ✅ Preferir - remover código não utilizado
# Implementar apenas quando houver necessidade real
```

### KISS (Keep It Simple, Stupid)
**Problema no repo**: Lógica complexa em funções grandes
```python
# ❌ Evitar - função com 100+ linhas em backend/v2/main.py
@base_blueprint.route("/filter")
def filter(session=None):
    # 120+ linhas de lógica complexa misturada

# ✅ Preferir - quebrar em funções menores
def validate_parameters(request_args):
    """Valida parâmetros da requisição"""
    
def process_sinais(sinais_data):
    """Processa dados de sinais vitais"""
    
@base_blueprint.route("/filter")
def filter(session=None):
    params = validate_parameters(request.args)
    return process_sinais(params)
```

### Componentização Atômica
**Aplicação no repo**: Componentes React devem ser pequenos e focados
```javascript
// ✅ Bom exemplo - frontend/src/components/loading/index.jsx
export const Loading = ({ message }) => (
  <LoadingContainer>
    <Spinner />
    {message && <Message>{message}</Message>}
  </LoadingContainer>
);

// ❌ Evitar - componente fazendo muitas coisas
// frontend/src/components/main-form/index.jsx (356 linhas)
```

## Padrões de Código

### Python (Backend)
- **Estilo**: PEP 8 e PEP 257
- **Formatação**: `ruff format`
- **Linting**: `ruff check`
- **Docstrings**: Obrigatórias para funções públicas

```python
def calc_classificacao(sinais: dict, sintomas: list) -> dict:
    """
    Calcula a classificação de risco do paciente.
    
    Regra de negócio: Classificação baseada no protocolo de Manchester
    - Vermelho: Emergência (atendimento imediato)
    - Laranja: Muito urgente (10 min)
    - Amarelo: Urgente (60 min)
    - Verde: Pouco urgente (120 min)
    - Azul: Não urgente (240 min)
    
    Args:
        sinais: Dicionário com sinais vitais
        sintomas: Lista de sintomas relatados
    
    Returns:
        Dicionário com classificação e tempo de espera
    """
```

### JavaScript/React (Frontend)
- **Estilo**: ESLint + Prettier
- **Componentes**: Funcionais com hooks
- **Estado**: Jotai para estado global
- **Props**: Validação com PropTypes ou TypeScript

```javascript
/**
 * Componente de classificação de risco
 * Regra de negócio: Cores seguem protocolo de Manchester
 * Decisão: Usar badges coloridos para acessibilidade
 */
export const RiskClassification = ({ level, waitTime }) => {
  // Invariante: level deve ser uma das 5 classificações válidas
  const validLevels = ['blue', 'green', 'yellow', 'orange', 'red'];
  if (!validLevels.includes(level)) {
    console.error(`Invalid risk level: ${level}`);
    return null;
  }
  
  return (
    <Badge color={level}>
      {getLevelText(level)} - {waitTime}min
    </Badge>
  );
};
```

### Commits e Versionamento
- **Formato**: Conventional Commits
- **Exemplos**:
  ```bash
  feat(api): adicionar endpoint para vulnerabilidades
  fix(calc): corrigir cálculo de prioridade para idosos
  refactor(frontend): extrair lógica de validação para utils
  docs(readme): atualizar instruções de instalação
  test(api): adicionar testes para classificação
  chore(deps): atualizar dependências de segurança
  ```

### Versionamento Semântico
- **MAJOR.MINOR.PATCH** (ex: 2.1.0)
- MAJOR: mudanças incompatíveis na API
- MINOR: novas funcionalidades compatíveis
- PATCH: correções de bugs compatíveis

## Guia de Contribuição

### Setup do Ambiente

#### Backend
```bash
# Instalar dependências
cd backend
pip install -r requirements.txt

# Configurar banco de dados
cp ../.env.example .env
# Editar .env com credenciais do MySQL

# Rodar migrações
alembic upgrade head

# Iniciar servidor de desenvolvimento
python app.py
```

#### Frontend
```bash
# Instalar dependências
cd frontend
npm install

# Configurar ambiente
cp .env.development .env.local
# Editar .env.local com URL da API

# Iniciar desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Comandos Essenciais

#### Qualidade de Código
```bash
# Backend - Lint e formatação
cd backend
ruff check . --fix     # Corrige problemas automaticamente
ruff format .          # Formata código

# Frontend - Lint e formatação
cd frontend
npm run lint           # Verifica problemas
npm run format         # Formata código
```

#### Testes
```bash
# Backend
cd backend
pytest                                    # Roda todos os testes
pytest --cov=v2 --cov-report=html       # Com cobertura
pytest -k "test_calc"                    # Testes específicos

# Frontend
cd frontend
npm test                                 # Testes unitários
npm run test:coverage                   # Com cobertura
npm run test:e2e                        # Testes E2E
```

### Checklist antes do PR

- [ ] Código segue padrões PEP 8 (Python) ou ESLint (JS)
- [ ] Testes passando (`pytest` / `npm test`)
- [ ] Sem código comentado ou funções vazias
- [ ] Docstrings/comentários para regras de negócio
- [ ] Sem `print()` ou `console.log()` em produção
- [ ] Imports organizados e sem não utilizados
- [ ] Commit segue Conventional Commits
- [ ] Branch atualizada com `main`
- [ ] README atualizado se necessário

## Hooks Pre-commit

### Configuração
```bash
# Instalar pre-commit
pip install pre-commit

# Instalar hooks
pre-commit install

# Rodar manualmente
pre-commit run --all-files
```

### Arquivo `.pre-commit-config.yaml`
```yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.5.0
    hooks:
      - id: ruff
        args: [--fix]
      - id: ruff-format
  
  - repo: https://github.com/pre-commit/mirrors-eslint
    rev: v9.0.0
    hooks:
      - id: eslint
        files: \.(js|jsx)$
        additional_dependencies:
          - eslint@9.0.0
          - eslint-plugin-react
```

## Exemplos de Comandos

### Desenvolvimento Diário
```bash
# Iniciar ambiente completo
docker-compose up -d

# Ver logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Resetar banco de dados
cd backend
alembic downgrade base
alembic upgrade head
python populate_db.py

# Limpar cache e reinstalar
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Debug e Troubleshooting
```bash
# Verificar sintaxe Python
python -m py_compile backend/v2/*.py

# Verificar tipos (se configurado)
mypy backend/v2/

# Analisar bundle do frontend
cd frontend
npm run build -- --analyze

# Verificar vulnerabilidades
npm audit
pip check
```

## Segurança

### Regras Críticas
1. **NUNCA** commitar credenciais (use `.env`)
2. **SEMPRE** validar entrada do usuário
3. **EVITAR** SQL injection (usar ORM)
4. **SANITIZAR** dados antes de exibir
5. **LIMITAR** tamanho de requisições
6. **IMPLEMENTAR** rate limiting em produção

### Exemplo de Validação
```python
# backend/v2/main.py
@base_blueprint.route("/patient", methods=["POST"])
def create_patient():
    data = request.json
    
    # Validação de entrada
    if not data.get("age") or not isinstance(data["age"], int):
        return jsonify({"error": "Idade inválida"}), 400
    
    if data["age"] < 0 or data["age"] > 150:
        return jsonify({"error": "Idade fora do intervalo"}), 400
    
    # Sanitização
    name = bleach.clean(data.get("name", ""))
    
    # Continuar processamento...
```

## Métricas de Qualidade

### Objetivos
- **Cobertura de testes**: > 70% para código novo
- **Complexidade ciclomática**: < 10 por função
- **Duplicação de código**: < 5%
- **Tamanho de funções**: < 50 linhas
- **Tamanho de arquivos**: < 300 linhas

### Monitoramento
```bash
# Complexidade do código Python
radon cc backend/ -s -nb

# Duplicação de código
jscpd backend/ frontend/src/ --min-lines 5

# Métricas do frontend
npm run build -- --stats
```

## Referências

- [PEP 8 - Style Guide for Python](https://pep8.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [React Best Practices](https://react.dev/learn/thinking-in-react)
- [Flask Best Practices](https://flask.palletsprojects.com/en/3.0.x/patterns/)
- [Protocolo de Manchester](https://www.smu.org.br/protocolo-de-manchester/)