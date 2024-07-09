import ky from "ky";
import Cookies from "js-cookie";
import { BASE_URL, getHeaders } from "./config-fetch.js";

// Fonction pour se SignIn-Up
export async function authSignInUp(objectUrl, body) {
  if (Cookies.get("keellauth")) {
    Cookies.remove("keellauth");
  }
  const response = await ky.post(BASE_URL + objectUrl, {
    headers: getHeaders(),
    json: body,
  });
  if(response.headers.get("Authorization") !== null){
    Cookies.set("keellauth", response.headers.get("Authorization"));
  }
  if (response) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")){
      return response.json();
    } else {
      return response
    }
  }
}

// Fonction pour changer le mot de passe
export async function authPatch(objectUrl, body) {
  const response = await ky.patch(BASE_URL + objectUrl, {
    headers: getHeaders(),
    json: body,
  })
  if (response) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const text = await response.text();
      if (text) {
        try {
          const data = JSON.parse(text);
          return data;
        } catch (e) {
          console.error("Invalid JSON:", e);
        }
      }
    } 
  }
}

// Fonction pour se SignOut
export async function authSignOut(objectUrl) {
  const local = localStorage.getItem("user")
  const response = await ky.delete(BASE_URL + objectUrl, {
    headers: getHeaders(),
  });
  Cookies.remove("keellauth");
  if(local){
    localStorage.clear("user")
  }
  return response.json();
}
