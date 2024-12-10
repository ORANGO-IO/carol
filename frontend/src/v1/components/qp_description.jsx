import React from "react";
import { Segment } from "semantic-ui-react";

export default (props) => {
  return (
    <Segment>
      {props.showedQP.map((qp) => (
        <div>
          <h4>{qp.sintoma} {qp.categoria ? `(${qp.categoria})` : null}</h4>
          {qp.observacao ? <h5>{qp.observacao}</h5> : null}
          <section>
            {["vermelho", "laranja", "amarelo", "verde", "azul"].map(
              (classificacaoStr) => (
                Object.entries(qp.classificacao).map((classificacao) => {
                  if (classificacaoStr == classificacao[0]) {
                    // let classificacao = classificacao[1]
                    return (
                      <div
                        className={`classificacao background ${
                          classificacao[1].nome
                        }`}
                      >
                        {
                          /* <header>
                        <h4>{classificacao[1].nome}</h4>
                      </header> */
                        }
                        <section>
                          {classificacao[1].sinais.length
                            ? <h3>Sinais</h3>
                            : null}
                          {classificacao[1].sinais.length
                            ? classificacao[1].sinais.map((sinal) => (
                              <div className="sinal_sintoma">
                                <h4>{sinal.sinal.nome}</h4>
                                <div>
                                  {sinal.min
                                    ? [
                                      `MENOR OU IGUAL QUE: ${sinal.min} ${sinal.sinal.unidade}`,
                                      <br />,
                                    ]
                                    : null}
                                  {sinal.max
                                    ? `MAIOR OU IGUAL QUE: ${sinal.max} ${sinal.sinal.unidade}`
                                    : null}
                                  {sinal.descritor
                                    ? (
                                      <div>
                                        <i>{sinal.descritor}</i>
                                      </div>
                                    )
                                    : null}
                                </div>
                              </div>
                            ))
                            : null}

                          {classificacao[1].sintomas.length
                            ? <h3>Sintomas</h3>
                            : null}
                          {classificacao[1].sintomas.length
                            ? classificacao[1].sintomas.map((sintoma) => (
                              <div className="sinal_sintoma">
                                <h4>{sintoma.sintoma}</h4>
                                <p>{sintoma.descritor}</p>
                              </div>
                            ))
                            : null}
                        </section>
                      </div>
                    );
                  }
                })
              ),
            )}
            {/* <pre>{JSON.stringify(qp, null, 2)}</pre> */}
          </section>
        </div>
      ))}
    </Segment>
  );
};
