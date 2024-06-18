import ky from "ky";
import { BASE_URL, getHeaders } from "./config-fetch";


// Fonction pour recuperer les donnees
export async function getData(objectUrl) {
  try {
    const response = await ky
      .get(BASE_URL + objectUrl, { headers: getHeaders() })
      .json();
    return response;
  } catch (error) {
    console.error("Erreur lors de la recuperations des donnees :", error);
  }
}

// Fonction pour envoyer les données
export async function postData(objectUrl, workout) {
  const formData = new FormData();
  for (const key in workout) {
    if (workout.hasOwnProperty(key) && key !== 'images') {
      console.log(`Ajout de ${key}:`, workout[key]);
      formData.append(`workout[${key}]`, workout[key]);
    }
  }
  workout.images.forEach((imageFile, index) => {
    console.log(`Ajout de l'image à l'index ${index}:`, imageFile);
    formData.append('workout[images][]', imageFile);
  });
  
    try {
    const response = await ky.post(BASE_URL + objectUrl, {
      headers: getHeaders(),
      body: formData,
    }).json();
    console.log('Réponse reçue de l\'API:', response);
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
}

// Fonction pour supprimer les donnees
export async function deleteData(objectUrl) {
  try {
    const response = await ky
      .delete(BASE_URL + objectUrl, { headers: getHeaders() })
      .json();
    return response;
  } catch (error) {
    console.error("Erreur lors de la suppression des donnees :", error);
  }
}

// Fonction pour update les donnees
export async function updateData(objectUrl, body) {
  const formData = new FormData();
  for (const key in body) {
    if (body.hasOwnProperty(key)) {
      formData.append(`workout[${key}]`, body[key]);
    }
  }
  try {
    const response = await ky
      .patch(BASE_URL + objectUrl, {
        headers: getHeaders(),
        body: formData,
      })
      .json();
    return response;
  } catch (error) {
    console.error("Erreur lors de la recuperations des donnees :", error);
  }
}
