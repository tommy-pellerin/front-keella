import Cookies from "js-cookie";

export const BASE_URL = "http://localhost:3000";

export function getHeaders() {
  const token = Cookies.get("token");
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}
