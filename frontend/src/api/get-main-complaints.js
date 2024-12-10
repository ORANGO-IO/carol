import axios from "../axios-config";

export async function getMainComplaints() {
  try {
    const request = await axios.get("/qp");
    return request.data;
  } catch (error) {
    return [];
  }
}
