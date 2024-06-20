import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UsersIcon, CurrencyDollarIcon, CalendarIcon, ClockIcon, RocketLaunchIcon, MapPinIcon, MapIcon, IdentificationIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { postData, getData, updateData } from '../../services/data-fetch';

import Alert from '../../styles/Alert';

const FormWorkout = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const { workout_id } = useParams();
    // const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false); 
    const [validationErrors, setValidationErrors] = useState([]);
    const [alertType, setAlertType] = useState('success');
    const [categories, setCategories] = useState([]);
    const [category_id, setCategoryId] = useState('')
    const [previewImages, setPreviewImages] = useState([]);
    const [filesToUpload, setFilesToUpload] = useState([]);   
    const [workout, setWorkout] = useState({
        title: '',
        description: '',
        start_date: '',
        duration: '', 
        city: '',
        zip_code: '',
        price: '', 
        max_participants: '',        
        workout_images: []
      });
    
      useEffect(() => {
        console.log(workout_id);
        const loadCategories = async () => {
          const data = await getData('/categories');
          setCategories(data);
        };
    
        const loadWorkoutData = async () => {
            try {
              const workoutData = await getData(`/workouts/${workout_id}`);
              if (workoutData) {
                setWorkout({
                  title: workoutData.title || '',
                  description: workoutData.description || '',
                  start_date: workoutData.start_date || '',
                  duration: workoutData.duration.toString() || '',
                  city: workoutData.city || '',
                  zip_code: workoutData.zip_code || '',
                  price: workoutData.price.toString() || '',
                  max_participants: workoutData.max_participants.toString() || '',
                  // ... autres champs si nécessaire ...
                });
                setPreviewImages(workoutData.image_urls || []);
                console.log(workoutData.image_urls);
              }
            } catch (error) {
              console.error("Erreur lors du chargement des données du workout :", error);
            }
          };
      
          if (workout_id) {
            loadWorkoutData();
          }
          loadCategories();
        }, [workout_id]);

  // Gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    const workoutData = { ...workout, category_id };
    // console.log('Données du formulaire avant envoi:', workoutData);
    let errors = [];

    // Vérifiez chaque champ ici selon les règles de validation de l'API
    // if (!workout.title) errors.push('Le titre est requis.');
    if (!workout.description) errors.push('La description est requise.');
    // if (!workout.city) errors.push('La ville est requise.');
    if (!workout.zip_code) errors.push('Le code postal est requis.');
    // Validation du prix
    const price = parseFloat(workout.price);
    if (isNaN(price) || price < 0 || price > 100) {
        errors.push('Le prix doit être compris entre 0 et 100€.');
    }
    // Validation de la date de début
        const startDate = new Date(workout.start_date);
        const now = new Date();
        const fourHoursLater = new Date(now.getTime() + 4 * 60 * 60 * 1000); // 4 heures plus tard
        if (startDate < fourHoursLater) {
            errors.push('La date de début doit être supérieure à 4h avant le début du workout.');
        }
    // if (!workout.duration) errors.push('La durée est requise');
    // if (!workout.max_participants) errors.push('Le nombre de participants est requis.');
    

    // Si des erreurs de validation sont trouvées
    if (errors.length > 0) {
        setValidationErrors(errors);
        setShowAlert(true);
        setAlertType('error');
        return; 
      }
    
      // Vérifiez s'il y a des images ajoutées
        if (filesToUpload.length === 0) {
            const confirmNoImages = window.confirm("Êtes-vous sûr de vouloir créer le workout sans images ?");
            if (!confirmNoImages) {
            // L'utilisateur a choisi de ne pas créer le workout sans images
            return;
            }
        }

        try {
            let response;
            if (workout_id) {
              // Logique pour l'édition d'un workout existant
              response = await updateData(`/workouts/${workout_id}`, workoutData, filesToUpload);
              if (response && response.id) {
                setSuccessMessage('Le workout a été mis à jour avec succès !'); // Message personnalisé pour l'édition
              }
            } else {
              // Logique pour la création d'un nouveau workout
              response = await postData('/workouts', workoutData, filesToUpload);
              if (response && response.id) {
                setSuccessMessage('Le workout a été créé avec succès !'); // Message personnalisé pour la création
              }
            }
      
            // Gérer la réponse ici
            if (response && response.id) {
              setValidationErrors([]); // Réinitialisez les erreurs de validation
              setShowAlert(true);
              setAlertType('success');
              // navigate('/'); 
            } else {
              setShowAlert(true);
              setAlertType('error');
              setValidationErrors(['Une erreur est survenue lors de la soumission des données.']);
            }
          } catch (error) {
            // Gérez les erreurs ici
            setShowAlert(true);
            setAlertType('error');
            setValidationErrors(['Une erreur est survenue lors de la soumission des données.']);
            console.error("Erreur lors de la soumission du formulaire :", error);
          }
        };

  // Gérer les changements dans les champs du formulaire
  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'category_id') {
      setCategoryId(value);
    } else {
      setWorkout({ ...workout, [name]: value });
    }
  };

 // Fonction pour gérer le changement d'image et la prévisualisation
const handleImageChange = (event) => {
    if (filesToUpload.length < 3) {
      const file = event.target.files[0];
      if (file) {
        const newPreviewImage = URL.createObjectURL(file);
        const newFilesToUpload = [...filesToUpload, file];
  
        // Mettre à jour l'état pour la prévisualisation et les fichiers à envoyer
        setPreviewImages([...previewImages, newPreviewImage]);
        setFilesToUpload(newFilesToUpload);
      }
    } else {
      console.log("Vous ne pouvez pas ajouter plus de 3 images.");
    }
  };
  
 
  // Afficher les images sélectionnées avec un style de carte
  const renderImagesPreview = () => {
    return previewImages.map((imageUrl, index) => {
      // Vérifiez si l'URL est une URL de blob ou une URL complète
      // const isBlobUrl = imageUrl.startsWith('blob:');
      // const fullImageUrl = isBlobUrl ? imageUrl : BASE_URL + imageUrl;
  
      return (
        <div key={index} className="border border-gray-300 shadow-lg p-2 relative">
          <img src={imageUrl} alt={`Aperçu ${index}`} className="max-w-xs" />
          {/* Bouton pour supprimer l'image */}
          <button
            onClick={() => handleRemoveImage(index)}
            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
          >
            &times;
          </button>
        </div>
      );
    });
  };
 // Gérer la suppression d'une image
const handleRemoveImage = (index) => {
    const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
    const updatedFilesToUpload = filesToUpload.filter((_, i) => i !== index);
    console.log(`Image à l'index ${index} supprimée`);
    setPreviewImages(updatedPreviewImages);
    setFilesToUpload(updatedFilesToUpload);
  };


  // Dans le cas où il n'y a pas d'images, afficher un emplacement vide avec un bouton '+'
  const renderEmptySlots = () => {
    const emptySlots = [];
    for (let i = previewImages.length; i < 3; i++) {
      emptySlots.push(
        <div key={i} className="border border-gray-300 shadow-lg p-2 h-32 flex justify-center items-center relative">
          <span className="text-gray-500">Ajouter une image</span>
          {/* Bouton pour ajouter une image */}
          <button
            onClick={() => document.getElementById(`imageUpload${i}`).click()}
            className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full"
          >
            +
          </button>
          {/* Input caché pour l'upload d'image */}
          <input
            type="file"
            id={`imageUpload${i}`}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>
      );
    }
    return emptySlots;
  };

  return (
    <>
        
        <Alert 
        showAlert={showAlert} 
        setShowAlert={setShowAlert} 
        message={
          <div>
            {alertType === 'success' ? 
              successMessage : 
              validationErrors.map((error, index) => (
                <React.Fragment key={index}>
                  {error}
                  <br />
                </React.Fragment>
              ))
            }
          </div>
        } 
        type={alertType} 
      />
        
        
      {/* Bandeau bleu avec un titre */}
        <div className="bg-primary-color text-white text-center py-10 mb-8">
        <h1 className="text-4xl">
            {workout_id ? 'Éditer votre séance' : 'Proposer une nouvelle séance'}
        </h1>
        </div>
  
      {/* Conteneur principal */}
      <div className="flex flex-col items-center mt-8 mb-16">

        {/* Cartes de prévisualisation des images */}
      <div className="grid grid-cols-3 gap-4 mb-16">
        {renderImagesPreview()}
        {renderEmptySlots()}
      </div>
            {/* Zone de texte pour la description */}
      <div className="w-full max-w-4xl mb-8">
        <PencilSquareIcon className="h-6 text-blue-500 mr-2" />
        <textarea name="description" placeholder="Description" value={workout.description} onChange={handleChange} required className="w-full h-32" />
      </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mb-8" >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        {/* Première colonne */}
        <div className="mb-6">
      <div className="flex items-center mb-4">
        <UsersIcon className="h-6 text-blue-500 mr-2" />
        <input type="number" name="max_participants" value={workout.max_participants}placeholder="Nombre de participants" onChange={handleChange} required className="w-full" />
      </div>
      
      <div className="flex items-center mb-4">
      <MapPinIcon className="h-6 text-blue-500 mr-2" />
        <input type="text" name="zip_code" placeholder="Code postal" value={workout.zip_code} onChange={handleChange} required className="w-full" />
      </div>
      <div className="flex items-center mb-4">
      <MapIcon className="h-6 text-blue-500 mr-2" />
        <input type="text" name="city" placeholder="Ville" value={workout.city} onChange={handleChange} required className="w-full" />
      </div>
    </div>
            
            {/* Deuxième colonne */}
            <div className="mb-6">
                <div className="flex items-center mb-4">
            <IdentificationIcon className="h-6 text-blue-500 mr-2" />
            <input type="text" name="title" placeholder="Titre " value={workout.title} onChange={handleChange} required className="w-full" />
            
                </div>

                <div className="flex items-center mb-4">
                    <CurrencyDollarIcon className="h-6 text-blue-500 mr-2" />
                    <input type="number" name="price" placeholder="Prix" value={workout.price} onChange={handleChange} required className="w-full" />
                    
                </div>
                  

                <div className="flex items-center mb-4">
                    <RocketLaunchIcon className="h-6 text-blue-500 mr-2" />
                    <select name="category_id" onChange={handleChange} required className="w-full">
                    <option value="">Sélectionner la Catégorie</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                    </select>
                </div>
            </div> 
            
            
            {/* Troisième colonne */}
            <div className="mb-6">
            <CalendarIcon className="h-6 text-blue-500 mb-2" />
            <input type="datetime-local" name="start_date" value={workout.start_date} placeholder="Date et heure de début" onChange={handleChange} required className="w-full mb-4" />
            <ClockIcon className="h-6 text-blue-500 mb-2" />
            <select name="duration" onChange={handleChange}  value={workout.duration}required className="w-full mb-4">
                <option value="">Sélectionnez une durée</option>
                <option value="30">30 min</option>
                <option value="60">1h</option>
                <option value="90">1h 30 min</option>
                <option value="120">2h</option>
                <option value="150">2h 30 min</option>
                <option value="180">3h</option>
                <option value="210">3h 30 min</option>
                <option value="240">4h</option>
                <option value="270">4h 30 min</option>
                <option value="300">5h</option>
                <option value="330">5h 30 min</option>
                <option value="360">6h</option>
                <option value="390">6h 30 min</option>
                <option value="420">7h</option>
                <option value="450">7h 30 min</option>
                <option value="480">8h</option>
            {/* Ajoutez d'autres options selon vos besoins */}
            </select>
          </div>
        </div>
          
          {/* Bouton de soumission */}
        <div className="flex justify-center">
        <button type="submit" className="button-primary-small text-white py-3 px-6 rounded">
                {workout_id ? 'Éditer Workout' : 'Créer Workout'}
        </button>
        </div>
        </form>
      </div>
    </>
  );
};

export default FormWorkout;