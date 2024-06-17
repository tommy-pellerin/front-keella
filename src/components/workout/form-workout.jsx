import { useState } from 'react';
import { UsersIcon, CurrencyDollarIcon, CalendarIcon, ClockIcon, RocketLaunchIcon, MapPinIcon, MapIcon, IdentificationIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
import { postData } from '../../services/data-fetch';


const FormWorkout = () => {
   
    const [workout, setWorkout] = useState({
        title: '',
        description: '',
        start_date: '',
        duration: '', 
        city: '',
        zip_code: '',
        price: '', 
        
        max_participants: '',
        
        images: []
      });
    

  // Gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    console.log('Données du formulaire avant envoi:', workout);
    try {
      const response = await postData('/workouts', workout);
      console.log('Réponse de l\'API:', response);
    } catch (error) {
      console.error("Erreur lors de la création de la séance :", error);
    }
  };

  // Gérer les changements dans les champs du formulaire
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`Changement détecté - ${name}: ${value}`);
    setWorkout({ ...workout, [name]: value });
  };

  // Gérer l'ajout d'images et la prévisualisation
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    console.log('Fichiers sélectionnés pour l\'upload:', files);
    setWorkout({ ...workout, images: [...workout.images, ...files] });
  };

  // Afficher les images sélectionnées avec un style de carte
const renderImagesPreview = () => {
    return workout.images.map((image, index) => (
      <div key={index} className="border border-gray-300 shadow-lg p-2 relative">
        <img src={image} alt={`Aperçu ${index}`} className="max-w-xs" />
        {/* Bouton pour supprimer l'image */}
        <button
          onClick={() => handleRemoveImage(index)}
          className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
        >
          &times;
        </button>
      </div>
    ));
  };

  // Gérer la suppression d'une image
const handleRemoveImage = (index) => {
    const updatedImages = workout.images.filter((_, i) => i !== index);
    console.log(`Image à l'index ${index} supprimée`);
    setWorkout({ ...workout, images: updatedImages });
  };


  // Dans le cas où il n'y a pas d'images, afficher un emplacement vide avec un bouton '+'
const renderEmptySlots = () => {
  const emptySlots = [];
  for (let i = workout.images.length; i < 3; i++) {
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
      {/* Bandeau bleu avec un titre */}
      <div className="bg-blue-500 text-white text-center py-10 mb-8">
        <h1 className="text-4xl">Propose ta séance</h1>
      </div>
  
      {/* Conteneur principal */}
      <div className="flex flex-col items-center mt-8 mb-16">

        {/* Cartes de prévisualisation des images */}
      <div className="grid grid-cols-3 gap-4 mb-16">
        {renderImagesPreview()}
        {renderEmptySlots()}
      </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="w-full max-w-4xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        {/* Première colonne */}
        <div className="mb-6">
      <div className="flex items-center mb-4">
        <UsersIcon className="h-6 text-blue-500 mr-2" />
        <input type="number" name="max_participants" placeholder="Nombre de participants" onChange={handleChange} required className="w-full" />
      </div>
      {/* <div className="flex items-center mb-4">
      <RocketLaunchIcon className="h-6 text-blue-500 mr-2" />
        <select name="category" onChange={handleChange} required className="w-full">
          <option value="">Sélectionnez une catégorie</option>
          <option value="fitness">Fitness</option>
          <option value="yoga">Yoga</option>
          <option value="running">Running</option>
        </select>
      </div> */}
      <div className="flex items-center mb-4">
      <MapPinIcon className="h-6 text-blue-500 mr-2" />
        <input type="text" name="zip_code" placeholder="Code postal" onChange={handleChange} required className="w-full" />
      </div>
      <div className="flex items-center mb-4">
      <MapIcon className="h-6 text-blue-500 mr-2" />
        <input type="text" name="city" placeholder="Ville" onChange={handleChange} required className="w-full" />
      </div>
    </div>
            
            {/* Deuxième colonne */}
            <div className="mb-6">
                <div className="flex items-center mb-4">
            <IdentificationIcon className="h-6 text-blue-500 mr-2" />
            <input type="text" name="title" placeholder="Titre" onChange={handleChange} required className="w-full" />
                </div>

                <div className="flex items-center mb-4">
            <CurrencyDollarIcon className="h-6 text-blue-500 mr-2" />
            <input type="number" name="price" placeholder="Prix" onChange={handleChange} required className="w-full" />
                </div>
                
                    <div className="flex-1">
                    <PencilSquareIcon className="h-6 text-blue-500 mr-2" />
                        <textarea name="description" placeholder="Description" onChange={handleChange} required className="w-full h-32" />
                    </div>
             </div>   
            
            
            {/* Troisième colonne */}
            <div className="mb-6">
            <CalendarIcon className="h-6 text-blue-500 mb-2" />
            <input type="datetime-local" name="start_date" placeholder="Date et heure de début" onChange={handleChange} required className="w-full mb-4" />
            <ClockIcon className="h-6 text-blue-500 mb-2" />
            <select name="duration" onChange={handleChange} required className="w-full mb-4">
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
            <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded">Créer Workout</button>
        </div>
        </form>
      </div>
    </>
  );
};

export default FormWorkout;