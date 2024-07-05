import Cookies from "js-cookie";

export const BASE_URL = "http://localhost:3000";
// export const BASE_URL = "https://back-keella.fly.dev";

export function getHeaders() {
  const token = Cookies.get("keellauth");
  const headers = {};
  if (token) {
    headers.Authorization = `${token}`;
  }
  return headers;
}
