import axios from '@/axios-config';

export async function getVulnerabilities() {
  try {
    const request = await axios.get(`/vulnerabilidades`);
    return request.data;
  } catch (error) {
    return [];
  }
}
  