import ky from "ky";
import Cookies from "js-cookie";
import { BASE_URL, getHeaders } from "./config-fetch";

// Fonction pour se SignIn-Up
export async function authSignInUp(objectUrl, body) {
  if (Cookies.get("keellauth")) {
    Cookies.remove("keellauth");
  }
  console.log(body);
  const response = await ky.post(BASE_URL + objectUrl, {
    headers: getHeaders(),
    json: body,
  });
  Cookies.set("keellauth", response.headers.get("Authorization"));
  return response.json();
}

// Fonction pour changer le mot de passe
export async function resetPassword(objectUrl, body) {
  console.log(body);
  const response = await ky.patch(BASE_URL + objectUrl, {
    headers: getHeaders(),
    json: body,
  })
  console.log(response);
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
      } else {
        console.log("Empty response body");
      }
    } else {
      console.log("Response is not JSON");
      const text = await response.text();
      console.log("Response text:", text); //this line wll show in the console that the server did not send any answer, if need an answer, we need to override devise methode in passwordsController
    }
  }
}

// Fonction pour se SignOut
export async function authSignOut(objectUrl) {
  const response = await ky.delete(BASE_URL + objectUrl, {
    headers: getHeaders(),
  });
  Cookies.remove("keellauth");
  return response.json();
}
