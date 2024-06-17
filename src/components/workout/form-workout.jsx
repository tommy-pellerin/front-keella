import { useState } from 'react';

const FormWorkout = () => {
  const [workout, setWorkout] = useState({
    title: '',
    start_date: '',
    duration: '',
    price: '',
    participant_count: '',
    city: '',
    postal_code: '',
    user_limit: '',
    category: '',
    images: []
  });

  // Gérer la soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    // Envoyer les données à l'API Rails
  };

  // Gérer les changements dans les champs du formulaire
  const handleChange = (event) => {
    const { name, value } = event.target;
    setWorkout({ ...workout, [name]: value });
  };

  // Gérer l'ajout d'images
  const handleImageChange = (event) => {
    setWorkout({ ...workout, images: [...workout.images, event.target.files[0]] });
  };

  return (
    <form onSubmit={handleSubmit} className="form-workout">
      {/* Champs du formulaire */}
      <input type="text" name="title" placeholder="Titre" onChange={handleChange} required />
      <input type="datetime-local" name="start_date" placeholder="Date et heure de début" onChange={handleChange} required />
      <input type="number" name="duration" placeholder="Durée (en minutes)" onChange={handleChange} required />
      <input type="number" name="price" placeholder="Prix" onChange={handleChange} required />
      <input type="number" name="participant_count" placeholder="Nombre de participants" onChange={handleChange} required />
      <input type="text" name="city" placeholder="Ville" onChange={handleChange} required />
      <input type="text" name="postal_code" placeholder="Code postal" onChange={handleChange} required />
      <input type="number" name="user_limit" placeholder="Nombre d'utilisateurs" onChange={handleChange} required />
      <select name="category" onChange={handleChange} required>
        {/* Remplacer avec les catégories de sports disponibles */}
        <option value="">Sélectionnez une catégorie</option>
        <option value="fitness">Fitness</option>
        <option value="yoga">Yoga</option>
        <option value="running">Running</option>
      </select>
      <input type="file" name="images" onChange={handleImageChange} multiple />
      {/* Bouton de soumission */}
      <button type="submit">Créer Workout</button>
    </form>
  );
};

export default FormWorkout;