import ky from "ky";
import Cookies from "js-cookie";
import { BASE_URL, getHeaders } from "./config-fetch";

// Fonction pour se SignIn-Up
export async function authSignInUp(objectUrl, body) {
  if (Cookies.get("keellauth")) {
    Cookies.remove("keellauth");
  }
  const response = await ky.post(BASE_URL + objectUrl, {
    headers: getHeaders(),
    json: body,
  });
  Cookies.set("keellauth", response.headers.get("Authorization"));
  return response.json();
}

// Fonction pour se SignOut
export async function authSignOut(objectUrl) {
  const response = await ky.delete(BASE_URL + objectUrl, {
    headers: getHeaders(),
  });
  Cookies.remove("keellauth");
  return response.json();
}
