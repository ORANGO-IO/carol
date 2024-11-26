import React from "react";
import axios from "axios";

export default async () => {
  let rtn = null;

  await axios(`${import.meta.env.REACT_APP_API}/qp`)
    .then((response) => {
      let data = [];
      response.data.forEach((qp) => {
        let tmp = {};
        tmp.ID = qp.ID;
        tmp.label = (
          <div>
            <strong>{qp.sintoma}</strong>
            <p>{qp.observacao}</p>
          </div>
        );
        tmp.value = qp.sintoma;
        tmp.content = `${qp.sintoma} ${qp.observacao}`;
        data.push(tmp);
      });
      console.log(response.data);
      rtn = data;
      console.log(rtn);
    })
    .catch(() => console.log("Não foi possível capturar as categorias"));

  if (rtn.length) {
  }

  return rtn;
};
