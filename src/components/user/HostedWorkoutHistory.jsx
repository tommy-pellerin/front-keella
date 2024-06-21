import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';
import { getData } from '../../services/data-fetch';

function HostedWorkoutHistory() {
    const [user] = useAtom(userAtom);
    const { user_id } = useParams();
    const [hostedWorkouts, setHostedWorkouts] = useState([]);
    const [openWorkoutId, setOpenWorkoutId] = useState(null);
    const [workoutData, setWorkoutData] = useState([]); // État pour stocker les données des workouts
  
    useEffect(() => {
      const fetchHostedWorkouts = async () => {
        try {
          const data = await getData(`/users/${user_id}`);
          if (data && data.hosted_workouts) {
            const fetchedWorkoutData = await Promise.all(data.hosted_workouts.map(async (workout) => {
              const workoutDetails = await getData(`/workouts/${workout.id}`);
              return {
                ...workout,
                category: workoutDetails.category,
                available_places: workoutDetails.available_places,
                reservations: workoutDetails.reservations.map(reservation => ({
                  ...reservation.user,
                  status: reservation.status
                }))
              };
            }));
            setWorkoutData(fetchedWorkoutData); // Mettre à jour l'état avec les données récupérées
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
        }
      };
  
      if (user.isLogged) {
        fetchHostedWorkouts();
      }
    }, [user, user_id]);

  const toggleAccordion = (id) => {
    setOpenWorkoutId(openWorkoutId === id ? null : id); // Toggle l'accordéon ouvert/fermé
  };

//   fonction pour la duation du workout
  function formatDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}min`;
  }

  return (
    <>
      {/* Bandeau bleu avec un titre */}
      <div className="bg-primary-color text-white text-center py-10 mb-8">
        <h1 className="text-4xl">
          Éditer votre séance ou Proposer une nouvelle séance
        </h1>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {workoutData && workoutData.map((workout) => (
          <div key={workout.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-5">
              <button onClick={() => toggleAccordion(workout.id)} className="text-xl font-semibold mb-2 w-full text-left">
                {workout.title}
              </button>
              {openWorkoutId === workout.id && (
                <>

                <p className="text-gray-600 mb-4">
                Date et heure de création du workout: {new Date(workout.created_at).toLocaleString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-gray-600 mb-4">Prix: {parseFloat(workout.price).toFixed(2)}€</p>
                <p className="text-gray-600 mb-4">Ville: {(workout.city)}</p>
                <p className="text-gray-600 mb-4">Code Postal: {(workout.zip_code)}</p>
                <p className="text-gray-600 mb-4">Nombre de participants maximum: {(workout.max_participants)}</p>
                <p className="text-gray-600 mb-4">Durée: {formatDuration(workout.duration)}</p>
                <p className="text-gray-600 mb-4">Date et heure de début: {new Date(workout.start_date).toLocaleString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-gray-600 mb-4">Places disponibles: {workout.available_places}</p>
                <p className="text-gray-600 mb-4">Catégorie: {workout.category}</p>
                
                
                <ul className="mb-4">
  {workout.reservations && workout.reservations.map(reservation => (
    <li key={reservation.id} className="flex justify-between items-center mb-2">
        
      <span>{reservation.username}</span>
      <span>UserID: {reservation.id}</span> 
      <span>Statut: {reservation.status}</span> 
                        <Link to={`/profile/${reservation.id}`} className="text-blue-600 hover:text-blue-800 ml-2">Profil</Link>
                      <div>
                        <button className="text-white bg-green-500 hover:bg-green-700 font-medium rounded-lg text-sm px-3 py-1 mr-2">Accepter</button>
                        <button className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-3 py-1 mr-2">Refuser</button>
                        <button className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-3 py-1">Contacter client</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default HostedWorkoutHistory;