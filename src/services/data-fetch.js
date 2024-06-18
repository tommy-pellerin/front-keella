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
export async function postData(objectUrl, body) {
  let formData;
  console.log(body);
  if(body.price) {
    formData = new FormData();
    for (const key in body) {
      if (body.hasOwnProperty(key) && key !== 'images') {
        console.log(`Ajout de ${key}:`, body[key]);
        formData.append(`workout[${key}]`, body[key]);
      }
    }
    body.images.forEach((imageFile, index) => {
      console.log(`Ajout de l'image à l'index ${index}:`, imageFile);
      // Utilisez imageFile ici au lieu de fileToUpload
      formData.append('workout[images][]', imageFile);
    });
  } else if(body.reservation) {
    formData = new FormData();
    for (const key in body.reservation) {
        formData.append(`reservation[${key}]`, body.reservation[key]);
    }
  }
  
  try {
    const response = await ky.post(BASE_URL + objectUrl, {
      headers: getHeaders(),
      body: formData,
    }).json();
    console.log('Réponse reçue de l\'API:', response);
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    //To get personalized message form the server
    if (error.response) {
      error.response.json().then((body) => {
        console.error('Erreur du serveur:', body.error);
      });
    }
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
