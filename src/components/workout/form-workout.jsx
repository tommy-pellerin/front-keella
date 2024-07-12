import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UsersIcon, CurrencyDollarIcon, CalendarIcon, ClockIcon, RocketLaunchIcon, MapPinIcon, MapIcon, IdentificationIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { postData, getData, updateData } from '../../services/data-fetch';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { formatTime } from '../../services/time-fixes';


const FormWorkout = () => {
    
    const [successMessage, setSuccessMessage] = useState('');
    const { workout_id } = useParams();
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category_id, setCategoryId] = useState('');
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
        start_time: '',
        workout_images: []
    });

    useEffect(() => {
        const loadCategories = async () => {
          const data = await getData('/categories');
          setCategories(data);
        };

        const loadWorkoutData = async () => {
            try {
              const workoutData = await getData(`/workouts/${workout_id}`);
              if (workoutData) {
                const startDate = new Date(workoutData.start_date);
                const date = startDate.toISOString().split('T')[0];
                const time = formatTime(startDate);
                setWorkout({
                  title: workoutData.title || '',
                  description: workoutData.description || '',
                  start_date: date,
                  start_time: time,               
                  
                  duration: workoutData.duration.toString() || '',
                  city: workoutData.city || '',
                  zip_code: workoutData.zip_code || '',
                  price: workoutData.price.toString() || '',
                  max_participants: workoutData.max_participants.toString() || '',
                  // ... autres champs si nécessaire ...
                });
                setCategoryId(workoutData.category_id.toString());
                // setPreviewImages(workoutData.image_urls || []);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const startDateTime = workout.start_date + 'T' + workout.start_time + ':00'; // Combining date and time
        const workoutData = { 
            ...workout, 
            start_date: startDateTime, // Sending combined start_date to backend
            category_id 
        };
        delete workoutData.start_time; // Remove start_time before sending to backend
        let errors = [];

        // Vérifiez chaque champ ici selon les règles de validation de l'API
        // if (!workout.title) errors.push('Le titre est requis.');
        // Validation de la description
          if (!workout.description) {
            errors.push('La description est requise.');
            toast.error('La description est requise.');
          } else {
            const letterCount = workout.description.replace(/\s/g, '').length;
            if (letterCount < 10 || letterCount > 1000) {
                errors.push('La description doit contenir entre 10 et 1000 charactères.');
                toast.error('La description doit contenir entre 10 et 1000 charactères.');
            }
          }
        // if (!workout.city) errors.push('La ville est requise.');
        if (!workout.zip_code) errors.push('Le code postal requis doit contenir 5 chiffres');
        // Validation du prix
        const price = parseFloat(workout.price);
        if (isNaN(price) || price < 0 || price > 100) {
            errors.push('Le prix doit être compris entre 0 et 100€.');
            toast.error('Le prix doit être compris entre 0 et 100€.');
        }
        // Validation de la date de début
            const workoutStartDate = new Date(workoutData.start_date);
            const now = new Date(Date.now());
            const fourHoursLater = new Date(now.getTime() + 4 * 60 * 60 * 1000); // 4 heures plus tard
            if (workoutStartDate < fourHoursLater) {
              errors.push('L’heure de début de la séance doit être fixée au minimum 4 heures après l’heure actuelle.');
              toast.error('L’heure de début de la séance doit être fixée au minimum 4 heures après l’heure actuelle.');
            }
        // Validation du code postal
          if (!/^\d{5}$/.test(workout.zip_code)) {
            errors.push('Le code postal doit contenir exactement 5 chiffres.');
            toast.error('Vérifiez votre code postal .');
  }
        // Validation de la ville
            if (workout.city.length < 3 || workout.city.length > 50) {
              errors.push('La ville doit contenir entre 3 et 50 charactères.');
              toast.error('La ville doit contenir entre 3 et 50 charactères.');
          }

          // Validation du titre
          const letterCount = workout.title.replace(/\s/g, '').length;
          if (letterCount < 3 || letterCount > 50) {
              errors.push('Le titre doit contenir entre 3 et 50 charactères.');
              toast.error('Le titre doit contenir entre 3 et 50 charactères.');
          }
        

        // Si des erreurs de validation sont trouvées
        if (errors.length > 0) {
            setValidationErrors(errors);
            toast.error("Erreur");
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
                  toast.success("Success");
                  navigate('/'); 
                } else {
                  toast.error("Erreur lors de la soumission des données.");

                  setValidationErrors(['Une erreur est survenue lors de la soumission des données.']);
                }
              } catch (error) {
                // Gérez les erreurs ici
                toast.error("Erreur");
                setValidationErrors(['Une erreur est survenue lors de la soumission des données.']);
                // console.error("Erreur lors de la soumission du formulaire :", error);
              }
            };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'category_id') {
          setCategoryId(value);
        } else {
          setWorkout({ ...workout, [name]: value });
        }
      };

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
          toast.warning("Vous ne pouvez pas ajouter plus de 3 images.");
        }
      };

      const renderImagesPreview = () => {
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {previewImages.map((imageUrl, index) => (
              <div key={index} className="relative">
                <img src={imageUrl} alt={`Aperçu ${index}`} className="w-full h-auto" />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                >
                  &times;
                </button>
              </div>
            ))}
            {renderEmptySlots()}
          </div>
        );
      };

    const handleRemoveImage = (index) => {
        const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
        const updatedFilesToUpload = filesToUpload.filter((_, i) => i !== index);
        setPreviewImages(updatedPreviewImages);
        setFilesToUpload(updatedFilesToUpload);
    };

    const renderEmptySlots = () => {
      const emptySlots = [];
      const emptySlotsNeeded = 3 - previewImages.length;
      for (let i = 0; i < emptySlotsNeeded; i++) {
        emptySlots.push(
          <div key={`empty-${i}`} className="border border-gray-300 shadow-lg p-2 h-32 flex justify-center items-center relative">
            <span className="text-gray-500">Ajouter une image</span>
            <button
              onClick={() => document.getElementById(`imageUpload${i}`).click()}
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full"
            >
              +
            </button>
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
          <Helmet>
            <title>Keella | Création d&apos;un workout</title>
            <meta name="description" content="Création d'un workout" />
          </Helmet>

      {/* Bandeau bleu avec un titre */}
        <div className="background-blue-500">
        <h1 className="text-4xl">
            {workout_id ? 'Éditer votre séance' : 'Proposer une nouvelle séance'}
        </h1>
        </div>
        <div className="flex flex-col items-center mt-8 mb-16">
            <div className="flex flex-col items-center mt-8 mb-16">
                <div className="w-full max-w-4xl">
                    {renderImagesPreview()}
                    
                </div>

                <div className="w-full max-w-4xl mb-8 border p-4 rounded">
                    <label htmlFor="description" className="text-blue-500 font-semibold mb-2">
                        Description 
                    </label>
                    <div className="flex items-center">
                        <PencilSquareIcon className="h-6 text-blue-500 mr-2" />
                        <textarea 
                            name="description" 
                            id="description"
                            placeholder="Entrez une description de 10 à 1000 charactères" 
                            value={workout.description} 
                            onChange={handleChange} 
                            required 
                            className="w-full h-32" 
                        />
                    </div>
                </div>

                                        <form onSubmit={handleSubmit} className="w-full max-w-4xl mb-8">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div className="mb-6">
                            <label htmlFor="max_participants" className="text-blue-500 font-semibold mb-2">Nombre de participants</label>
                            <div className="flex items-center mb-4 border p-2 rounded">
                              <UsersIcon className="h-6 text-blue-500 mr-2" />
                              <input type="number" id="max_participants" name="max_participants" value={workout.max_participants} placeholder="Entre 1 et 1000" onChange={handleChange} required className="w-full" />
                            </div>

                            <label htmlFor="zip_code" className="text-blue-500 font-semibold mb-2">Code postal</label>
                            <div className="flex items-center mb-4 border p-2 rounded">
                              <MapPinIcon className="h-6 text-blue-500 mr-2" />
                              <input type="text" id="zip_code" name="zip_code" placeholder="5 chiffres" value={workout.zip_code} onChange={handleChange} required className="w-full" />
                            </div>
                            <label htmlFor="city" className="text-blue-500 font-semibold mb-2">Ville</label>
                            <div className="flex items-center mb-4 border p-2 rounded">
                              <MapIcon className="h-6 text-blue-500 mr-2" />
                              <input type="text" id="city" name="city" placeholder="Ville" value={workout.city} onChange={handleChange} required className="w-full" />
                            </div>
                          </div>

                          <div className="mb-6">
                            <label htmlFor="title" className="text-blue-500 font-semibold mb-2">Titre</label>
                            <div className="flex items-center mb-4 border p-2 rounded">
                              <IdentificationIcon className="h-6 text-blue-500 mr-2" />
                              <input type="text" id="title" name="title" placeholder="3 à 50 charactères" value={workout.title} onChange={handleChange} required className="w-full" />
                            </div>

                            <div className="flex flex-col mb-4 ">
                              <label htmlFor="price" className="text-blue-500 font-semibold mb-2">
                                  Prix 
                              </label>
                              <div className="flex items-center border p-2 rounded">
                                  <CurrencyDollarIcon className="h-6 text-blue-500 mr-2" />
                                  <input 
                                      type="number" 
                                      name="price" 
                                      id="price"
                                      placeholder="Un montant entre 0 et 100€" 
                                      value={workout.price} 
                                      onChange={handleChange} 
                                      required 
                                      className="w-full" 
                                      min="0" 
                                      max="100" 
                                  />
                              </div>
                          </div>

                          <label htmlFor="category_id" className="text-blue-500 font-semibold mb-2">Catégorie</label>
                          <div className="flex items-center mb-4 border p-2 rounded">
                            <RocketLaunchIcon className="h-6 text-blue-500 mr-2" />
                            <select 
                                id="category_id" 
                                name="category_id" 
                                value={category_id} // Assurez-vous que la valeur correspond à l'état category_id
                                onChange={handleChange} 
                                required 
                                className="w-full"
                            >
                                <option value="">Sélectionner la Catégorie</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                          </div>
                        </div>
                                              
                        <div className="mb-6">
                          <label htmlFor="start_date" className="text-blue-500 font-semibold mb-2">Date de début</label>
                          <div className="flex items-center mb-2 border p-2 rounded">
                            <CalendarIcon className="h-6 text-blue-500 mr-2" />
                            <input type="date" id="start_date" name="start_date" value={workout.start_date} placeholder="Date de début" onChange={handleChange} required className="w-full mb-4" />
                          </div>
                          <label htmlFor="start_time" className="text-blue-500 font-semibold mb-2">Heure de début</label>
                          <div className="flex items-center mb-2 border p-2 rounded">
                            <ClockIcon className="h-6 text-blue-500 mr-2" />
                            <select id="start_time" name="start_time" value={workout.start_time} onChange={handleChange} required className="w-full mb-4">
                              {[...Array(48)].map((_, index) => {
                                const hours = String(Math.floor(index / 2)).padStart(2, '0');
                                const minutes = index % 2 === 0 ? '00' : '30';
                                const timeValue = `${hours}:${minutes}`;
                                return <option key={timeValue} value={timeValue}>{timeValue}</option>;
                              })}
                            </select>
                          </div>

                          <label htmlFor="duration" className="text-blue-500 font-semibold mb-2">Durée</label>
                          <div className="flex items-center mb-4 border p-2 rounded">
                            <ClockIcon className="h-6 text-blue-500 mr-2" />
                            <select id="duration" name="duration" value={workout.duration} onChange={handleChange} required className="w-full mb-4">
                              <option value="">Sélectionnez une durée</option>
                              {[...Array(16)].map((_, index) => {
                                const value = (index + 1) * 30;
                                const hours = Math.floor(value / 60);
                                const minutes = value % 60;
                                return (
                                  <option key={value} value={value}>
                                    {hours > 0 ? `${hours}h ` : ''}{minutes > 0 ? `${minutes} min` : ''}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                    
                    <div className="flex justify-center">
                        <button type="submit" className="button-primary-small text-white py-3 px-6 rounded">
                            {workout_id ? 'Éditer Workout' : 'Créer Workout'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </>

    );
};

export default FormWorkout;