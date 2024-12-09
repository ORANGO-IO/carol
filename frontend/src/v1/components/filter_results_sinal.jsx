import React, { useContext, useState } from "react";
import { Accordion, Icon } from "semantic-ui-react";
import qpDetails from "../functions/qp_details";
import AppContext from "../../context";

export default (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const context = useContext(AppContext);

  const getQp = (id) => (e) => {
    qpDetails(id, (response) => {
      console.log(response.data);
      context.showQp([response.data]);
    });
  };

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <Accordion fluid styled>
      <Accordion.Title
        active={activeIndex === 0}
        index={0}
        onClick={handleClick}
      >
        <Icon name="dropdown" />
        Prioridades
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 0}>
        <div>
          {props.sinal.matchesPrincipais.map((result) => (
            <div
              className={`classificacao background ${result.classificacao.nome}`}
            >
              <header>
                <p>
                  <a onClick={getQp(result.qp.ID)}>{result.qp.sintoma}</a>
                </p>
              </header>
              <main>
                {result.sinal.nome}
                {result.min ? [`<= ${result.min}`, <br />] : null}
                {result.sinal.nome}
                {result.max ? [`>= ${result.max}`, <br />] : null}
                {result.descritor ? [`${result.descritor}`, <br />] : null}
              </main>
            </div>
          ))}
        </div>
      </Accordion.Content>

      <Accordion.Title
        active={activeIndex === 1}
        index={1}
        onClick={handleClick}
      >
        <Icon name="dropdown" />
        Ver mais
      </Accordion.Title>
      <Accordion.Content active={activeIndex === 1}>
        <div>
          {props.sinal.matchesSecundarios.map((result) => (
            <div
              className={`classificacao background ${result.classificacao.nome}`}
            >
              <header>
                <p>{result.qp.sintoma}</p>
              </header>
              <main>
                {result.sinal.nome}
                {result.min ? [`<= ${result.min}`, <br />] : null}
                {result.sinal.nome}
                {result.max ? [`>= ${result.max}`, <br />] : null}
                {result.descritor ? [`${result.descritor}`, <br />] : null}
              </main>
            </div>
          ))}
        </div>
      </Accordion.Content>
    </Accordion>
  );
};
