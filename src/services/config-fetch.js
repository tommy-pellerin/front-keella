import Cookies from "js-cookie";

// Use Vite environment variable for BASE_URL
export const BASE_URL = import.meta.env.VITE_BASE_URL;
// export const BASE_URL = "http://localhost:3000
// export const BASE_URL = "https://back-keella.fly.dev";

export function getHeaders() {
  const token = Cookies.get("keellauth");
  const headers = {};
  if (token) {
    headers.Authorization = `${token}`;
  }
  return headers;
}
