import React, { useState, useEffect } from 'react';
import { updateData, getData } from '../../services/data-fetch'; 
import WorkoutForm from './workoutform';

const WorkoutEdit = ({ workoutId }) => {
  const [categories, setCategories] = useState([]);
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
    // Fonction pour charger les catégories au montage du composant
    const loadCategories = async () => {
      const data = await getData('/categories'); // Utilisez l'URL appropriée pour votre API
      setCategories(data); // Mettez à jour l'état categories ici
    };

    loadCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page
    const workoutData = { ...workout, category_id }; // Préparer les données du formulaire
    console.log('Données du formulaire avant envoi:', workoutData);
  
    try {
      // Créer un objet FormData pour envoyer les fichiers et les données du formulaire
      const formData = new FormData();
      for (const key in workoutData) {
        if (workoutData.hasOwnProperty(key)) {
          formData.append(`workout[${key}]`, workoutData[key]);
        }
      }
      
  
      // Utiliser la fonction updateData pour envoyer les données au serveur
      const response = await updateData(`/workouts/${workoutId}`, formData);
      console.log('Réponse reçue de l\'API:', response);
  
      // Gérer la réponse du serveur ici, par exemple en redirigeant l'utilisateur
      // ou en affichant un message de succès
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la séance :", error);
      // Gérer l'erreur ici, par exemple en affichant un message à l'utilisateur
    }
  };



  return (
    <div>
      {/* ... autres éléments JSX ... */}
      <WorkoutForm
        workout={workout}
        setWorkout={setWorkout}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        categories={categories}
      />
    </div>
  );
};

export default WorkoutEdit;