import axios from "axios";

export default async (qpId, success, error) => {
  axios(`${process.env.REACT_APP_API}/qp/${qpId}`)
    .then((response) => {
      if (success) success(response);
    })
    .catch((err) => {
      console.log("Não foi possível capturar a queixa principal");
      if (error) error(err);
    });
};
