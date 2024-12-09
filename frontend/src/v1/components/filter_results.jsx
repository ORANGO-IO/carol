import React, { useContext } from "react";
import FilterResultsSinal from "./filter_results_sinal";
import { Segment } from "semantic-ui-react";
import qpDetails from "../functions/qp_details";
import AppContext from "../../context";

export default (props) => {
  const { triagem, resultados, sugestoes } = props.results;
  const context = useContext(AppContext);

  const getQp = (id) => (e) => {
    qpDetails(id, (response) => {
      console.log(response.data);
      context.showQp([response.data]);
    });
  };

  return [
    triagem
      ? <h2>Resultado de triagem</h2>
      : "Sem dados de triagem, investigação manual",
    triagem
      ? (
        <Segment
          className={`classificacao background ${triagem.classificacao.nome}`}
        >
          <a onClick={getQp(triagem.ID)}>
            <h4>
              {triagem.sintoma}{" "}
              {triagem.categoria ? `(${triagem.categoria})` : null}
            </h4>
          </a>
          {triagem.observacao ? <p>{triagem.observacao}</p> : null}
          <Segment>
            <p>
              Tempo de atendimento:{" "}
              <strong>{triagem.classificacao.tempo}</strong>
            </p>
            <p>
              {triagem.classificacao.nome} : {triagem.classificacao.descritor}
            </p>
          </Segment>
        </Segment>
      )
      : null,
    <h2>Resultado possíveis</h2>,
    resultados.map((resultado) => (
      <Segment
        className={`classificacao background ${resultado.classificacao.nome}`}
      >
        <a onClick={getQp(resultado.ID)}>
          <h4>
            {resultado.sintoma}{" "}
            {resultado.categoria ? `(${resultado.categoria})` : null}
          </h4>
        </a>
        {resultado.observacao ? <p>{resultado.observacao}</p> : null}
        <Segment>
          <p>
            Tempo de atendimento:{" "}
            <strong>{resultado.classificacao.tempo}</strong>
          </p>
          <p>
            {resultado.classificacao.nome} : {resultado.classificacao.descritor}
          </p>
        </Segment>
      </Segment>
    )),
    <h2>Outras sugestões</h2>,
    <Segment className="sugestoes">
      <ul>
        {sugestoes.map((sugestao) => (
          <li style={{ backgroundColor: `#${sugestao.cor_hex}` }}>
            <a onClick={getQp(sugestao.ID)}>{sugestao.sintoma}</a>
          </li>
        ))}
      </ul>
    </Segment>,
    <h2>Resultado por sinais</h2>,
    props.results.sinais.map((sinal) => [
      <h3>{sinal.nome}</h3>,
      <FilterResultsSinal sinal={sinal} />,
    ]),
  ];
};
