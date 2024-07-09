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
  // Ajout de la logique pour les évaluations
  if (body.rating) {
    for (const key in body.rating) {
      formData.append(`rating[${key}]`, body.rating[key]);
    }
  } else if(body.price) {
    for (const key in body) {
      if (body.hasOwnProperty(key) && key !== 'workout_images') {
        formData.append(`workout[${key}]`, body[key]);
      }
    }
    filesToUpload.forEach((imageFile, index) => {
      formData.append('workout[workout_images][]', imageFile); // Utilisez la clé 'workout[workout_images][]'
    });
  } else if(body.reservation) {
    for (const key in body.reservation) {
        formData.append(`reservation[${key}]`, body.reservation[key]);
    }
  } else if (body.category) {
    for (const key in body.category) {
      if (body.category.hasOwnProperty(key) && key !== 'category_image') {
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
    return response;
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
  // Wrap the body in the 'reservation' key
  for (const key in body) {
    if (body.hasOwnProperty(key)) {
      const formKey = isWorkoutUpdate ? `workout[${key}]` : `reservation[${key}]`;
      formData.append(formKey, body[key]);
    }
  }
  if(body.price) {
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        formData.append(`workout[${key}]`, body[key]);
      }
    }
    // Ajoutez les fichiers d'images pour les workouts si nécessaire
  if (isWorkoutUpdate && Array.isArray(filesToUpload)) {
    filesToUpload.forEach((file) => {
      formData.append('workout[workout_images][]', file);
    });
  }
  } else if(body.category) {
    for (const key in body.category) {
      if (body.category.hasOwnProperty(key) && key !== 'category_image') {
        formData.append(`category[${key}]`, body.category[key]);
      }
    }
    if (body.category.category_image) {
      formData.append('category[category_image]', body.category.category_image);
    }
  } else if(body.user) {
    for (const key in body.user) {
      if (body.user.hasOwnProperty(key) && key !== 'avatar') {
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
    return response;
  } catch (error) {
    console.error("Erreur lors de la mise à jour des données :", error);
  }
}