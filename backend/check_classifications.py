#!/usr/bin/env python
import os
import sys
sys.path.insert(0, '/var/www/carol.orango.io/backend')

os.environ['SQL_ALCHEMY_CONN_V1'] = 'mysql+pymysql://carol:JVeuiA7E30u8SQx5@db/carol_v1_db'
os.environ['SQL_ALCHEMY_CONN_V2'] = 'mysql+pymysql://carol:JVeuiA7E30u8SQx5@db/carol_v2_db'

from v2.utils.db import provide_session
from v2.models.classificacao import Classificacao

@provide_session
def get_classifications(session=None):
    results = session.query(Classificacao).all()
    print("Classificações no banco de dados:")
    print("-" * 80)
    for r in results:
        print(f'ID: {r.id}, Prioridade: {r.prioridade}, Nome: {r.classificacao}, Cor: #{r.cor_hex}, Tempo: {r.tempo_atendimento}')
    print("-" * 80)

if __name__ == "__main__":
    get_classifications()