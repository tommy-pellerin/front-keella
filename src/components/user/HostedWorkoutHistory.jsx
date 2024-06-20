import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';
import { getData } from '../../services/data-fetch';

function HostedWorkoutHistory() {
    const [hostedWorkouts, setHostedWorkouts] = useState([]);
    const [openWorkoutId, setOpenWorkoutId] = useState(null); // Ajout pour gérer l'accordéon
    const [user] = useAtom(userAtom);
    const { user_id } = useParams();

  useEffect(() => {
    const fetchHostedWorkouts = async () => {
      try {
        const data = await getData(`/users/${user_id}`);
        if (data && data.hosted_workouts) {
          // Pour chaque workout, récupérez les participants
          const workoutsWithParticipants = await Promise.all(data.hosted_workouts.map(async (workout) => {
            const workoutData = await getData(`/workouts/${workout.id}`);
            return { ...workout, participants: workoutData.participants };
          }));
          setHostedWorkouts(workoutsWithParticipants);
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

  return (
    <>
    {/* Bandeau bleu avec un titre */}
    <div className="bg-primary-color text-white text-center py-10 mb-8">
      <h1 className="text-4xl">
        Éditer votre séance ou Proposer une nouvelle séance
      </h1>
    </div>
    <div className="flex flex-col gap-4 p-4">
      {hostedWorkouts && hostedWorkouts.map((workout) => (
        <div key={workout.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-5">
            <button onClick={() => toggleAccordion(workout.id)} className="text-xl font-semibold mb-2 w-full text-left">
              {workout.title}
            </button>
            {openWorkoutId === workout.id && ( // Affiche le contenu de l'accordéon si ouvert
              <>
                <p className="text-gray-600 mb-4">Date et heure: {new Date(workout.start_date).toLocaleString()}</p>
                <p className="text-gray-600 mb-4">Prix: {parseFloat(workout.price).toFixed(2)}€</p>
                <ul className="mb-4">
                  {workout.participants && workout.participants.map(participant => (
                    <li key={participant.id} className="flex justify-between items-center mb-2">
                      <span>{participant.username}</span>
                      <Link to={`/profile/${participant.id}`} className="text-blue-600 hover:text-blue-800 ml-2">Profil</Link>
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