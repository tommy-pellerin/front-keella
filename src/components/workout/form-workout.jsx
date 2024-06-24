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
        console.log(workout_id);
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
                const time = startDate.toTimeString().slice(0, 5);
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
        if (!workout.description) errors.push('La description est requise.');
        // if (!workout.city) errors.push('La ville est requise.');
        if (!workout.zip_code) errors.push('Le code postal est requis.');
        // Validation du prix
        const price = parseFloat(workout.price);
        if (isNaN(price) || price < 0 || price > 100) {
            errors.push('Le prix doit être compris entre 0 et 100€.');
        }
        // Validation de la date de début
            const workoutStartDate = new Date(workoutData.start_date);
            const now = new Date();
            const fourHoursLater = new Date(now.getTime() + 4 * 60 * 60 * 1000); // 4 heures plus tard
            if (workoutStartDate < fourHoursLater) {
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
          console.log("Vous ne pouvez pas ajouter plus de 3 images.");
        }
      };

    const renderImagesPreview = () => {
        return previewImages.map((imageUrl, index) => {
            return (
                <div key={index} className="border border-gray-300 shadow-lg p-2 relative">
                    <img src={imageUrl} alt={`Aperçu ${index}`} className="max-w-xs" />
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

    const handleRemoveImage = (index) => {
        const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
        const updatedFilesToUpload = filesToUpload.filter((_, i) => i !== index);
        console.log(`Image à l'index ${index} supprimée`);
        setPreviewImages(updatedPreviewImages);
        setFilesToUpload(updatedFilesToUpload);
    };

    const renderEmptySlots = () => {
        const emptySlots = [];
        for (let i = previewImages.length; i < 3; i++) {
            emptySlots.push(
                <div key={i} className="border border-gray-300 shadow-lg p-2 h-32 flex justify-center items-center relative">
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
        
            <div className="bg-blue-500 text-white text-center py-10 mb-8">
                <h1 className="text-4xl">
                    {workout_id ? 'Éditer votre séance' : 'Proposer une nouvelle séance'}
                </h1>
            </div>
  
            <div className="flex flex-col items-center mt-8 mb-16">
                <div className="grid grid-cols-3 gap-4 mb-16">
                    {renderImagesPreview()}
                    {renderEmptySlots()}
                </div>

                <div className="w-full max-w-4xl mb-8">
                    <PencilSquareIcon className="h-6 text-blue-500 mr-2" />
                    <textarea name="description" placeholder="Description" value={workout.description} onChange={handleChange} required className="w-full h-32" />
                </div>

                <form onSubmit={handleSubmit} className="w-full max-w-4xl mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
                        
                        <div className="mb-6">
                            <div className="flex items-center mb-2">
                                <CalendarIcon className="h-6 text-blue-500 mr-2" />
                                <input type="date" name="start_date" value={workout.start_date} placeholder="Date de début" onChange={handleChange} required className="w-full mb-4" />
                            </div>
                            <div className="flex items-center mb-2">
                                <ClockIcon className="h-6 text-blue-500 mr-2" />
                                <select 
                                    name="start_time" 
                                    value={workout.start_time} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full mb-4"
                                >
                                    {[...Array(48)].map((_, index) => {
                                        const hours = String(Math.floor(index / 2)).padStart(2, '0');
                                        const minutes = index % 2 === 0 ? '00' : '30';
                                        const timeValue = `${hours}:${minutes}`;
                                        return <option key={timeValue} value={timeValue}>{timeValue}</option>;
                                    })}
                                </select>
                            </div>

                            <div className="flex items-center mb-4">
                                <ClockIcon className="h-6 text-blue-500 mr-2" />
                                <select name="duration" value={workout.duration} onChange={handleChange} required className="w-full mb-4">
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
        </>
    );
};

export default FormWorkout;