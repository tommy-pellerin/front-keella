import Cookies from "js-cookie";

export const BASE_URL = "http://localhost:3000";

export function getHeaders() {
  const token = Cookies.get("keellauth");
  console.log('Token récupéré:', token);
  const headers = {};
  if (token) {
    headers.Authorization = `${token}`;
  }
  // console.log('En-têtes de requête:', headers);
  return headers;
}
