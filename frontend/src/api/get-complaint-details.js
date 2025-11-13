import axios from 'axios';

const v1BaseUrl = import.meta.env.VITE_API_URL_V1 || import.meta.env.VITE_API_URL;

export async function getComplaintDetails(id) {
  if (!id) {
    throw new Error('ID da queixa principal não informado');
  }

  const sanitizedBaseUrl = v1BaseUrl?.replace(/\/$/, '') || '';
  const url = `${sanitizedBaseUrl}/qp/${id}`;

  const response = await axios.get(url);
  return response.data;
}
