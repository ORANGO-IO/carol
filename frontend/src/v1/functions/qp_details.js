import axios from 'axios';

export default async (qpId, success, error) => {
  axios(`${import.meta.env.VITE_API_URL}/qp/${qpId}`)
    .then((response) => {
      if (success) success(response);
    })
    .catch((err) => {
      console.log('Não foi possível capturar a queixa principal');
      if (error) error(err);
    });
};
