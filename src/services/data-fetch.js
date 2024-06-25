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
export async function postData(objectUrl, body, filesToUpload) {
  const formData = new FormData();
  console.log(body);
  if(body.price) {
    for (const key in body) {
      if (body.hasOwnProperty(key) && key !== 'workout_images') {
        console.log(`Ajout de ${key}:`, body[key]);
        formData.append(`workout[${key}]`, body[key]);
      }
    }
    filesToUpload.forEach((imageFile, index) => {
      console.log(`Ajout de l'image à l'index ${index}:`, imageFile);
      formData.append('workout[workout_images][]', imageFile); // Utilisez la clé 'workout[workout_images][]'
    });
  } else if(body.reservation) {
    for (const key in body.reservation) {
        formData.append(`reservation[${key}]`, body.reservation[key]);
    }
  } else if (body.category) {
    for (const key in body.category) {
      if (body.category.hasOwnProperty(key) && key !== 'category_image') {
        console.log(`Ajout de ${key}:`, body.category[key]);
        formData.append(`category[${key}]`, body.category[key]);
      }
    }
    if (body.category.category_image) {
      formData.append('category[category_image]', body.category.category_image);
    }
  }

  // try {
    const response = await ky.post(BASE_URL + objectUrl, {
      headers: getHeaders(),
      body: formData,
    }).json();
    console.log('Réponse reçue de l\'API:', response);
    return response;
  // } catch (error) {
  //   console.error("Erreur lors de la récupération des données :", error);
  //   //To get personalized message form the server
  //   if (error.response) {
  //     error.response.json().then((body) => {
  //       console.error('Erreur du serveur:', body.error);
  //     });
  //   }
  //   throw error; // Propagate the error to the calling function
  // }
}

// Fonction pour supprimer les donnees
export async function deleteData(objectUrl) {
  try {
    // No need to parse JSON for a 204 No Content response
    const response = await ky.delete(BASE_URL + objectUrl, { headers: getHeaders() });
    if (response.status === 204) {
      return null;
    } else {
      return response.json();
    }
  } catch (error) {
    console.error("Erreur lors de la suppression des données :", error);
    return null;
  }
}

// Fonction pour update les donnees
export async function updateData(objectUrl, body, filesToUpload) {
  const formData = new FormData();
  console.log(body);
  // Wrap the body in the 'reservation' key
  for (const key in body) {
    if (body.hasOwnProperty(key)) {
        formData.append(`reservation[${key}]`, body[key]);
    }
  }
  if(body.price) {
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        formData.append(`workout[${key}]`, body[key]);
      }
    }
    // Vérifiez que filesToUpload est défini et est un tableau avant d'utiliser forEach
    if (Array.isArray(filesToUpload)) {
      filesToUpload.forEach((file, index) => {
        formData.append('workout[workout_images][]', file);
      });
    }
  } else if(body.category) {
    for (const key in body.category) {
      if (body.category.hasOwnProperty(key) && key !== 'category_image') {
        console.log(`Ajout de ${key}:`, body.category[key]);
        formData.append(`category[${key}]`, body.category[key]);
      }
    }
    if (body.category.category_image) {
      formData.append('category[category_image]', body.category.category_image);
    }
  } else if(body.user) {
    for (const key in body.user) {
      if (body.user.hasOwnProperty(key) && key !== 'avatar') {
        console.log(`Ajout de ${key}:`, body.user[key]);
        formData.append(`user[${key}]`, body.user[key]);
      }
    }
    if (body.user.avatar) {
      formData.append('user[avatar]', body.user.avatar);
    }
  }
    if (body.status) { 
      formData.append('reservation[status]', body.status);
      
    }

  try {
    const response = await ky.patch(BASE_URL + objectUrl, {
      headers: getHeaders(),
      body: formData,
    }).json();
    console.log('Réponse du serveur:', response);
    return response;
  } catch (error) {
    console.error("Erreur lors de la mise à jour des données :", error);
  }
}