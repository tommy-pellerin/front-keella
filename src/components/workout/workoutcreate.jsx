import React, { useState, useEffect } from 'react';
import { postData, getData } from '../../services/data-fetch';
import WorkoutForm from './workoutform';

const WorkoutCreate = () => {
    const [categories, setCategories] = useState([]);
    const [category_id, setCategoryId] = useState('')
    
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
        // Fonction pour charger les catégories au montage du composant
        const loadCategories = async () => {
          const data = await getData('/categories'); // Utilisez l'URL appropriée pour votre API
          setCategories(data); // Mettez à jour l'état categories ici
        };
    
        loadCategories();
      }, []);

 // Gérer la soumission du formulaire
 const handleSubmit = async (event) => {
    event.preventDefault();
    const workoutData = { ...workout, category_id }; 
    console.log('Données du formulaire avant envoi:', workoutData);
    try {
      const response = await postData('/workouts', workoutData, filesToUpload); // Passez filesToUpload ici
      console.log('Réponse de l\'API:', response);
    } catch (error) {
      console.error("Erreur lors de la création de la séance :", error);
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

export default WorkoutCreate;