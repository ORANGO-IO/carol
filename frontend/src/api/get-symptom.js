import axios from '@/axios-config';

export async function getSymptoms() {
  try {
    const request = await axios.get(`/sintomas`);
    return request.data;
  } catch (error) {
    return [];
  }
}
  