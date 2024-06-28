import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';
import { getData, deleteData, updateData } from '../../services/data-fetch';
import CreateUserRatings from '../rating/CreateUserRatingsForHostedWorkouts.jsx';
import { formatDate, formatTime, formatDuration } from '../../services/time-fixes';
import { toast } from 'react-toastify';

function HostedWorkoutHistory() {
    const [user] = useAtom(userAtom);
    const { user_id } = useParams();
    const navigate = useNavigate();
    const [workoutIdToDelete, setWorkoutIdToDelete] = useState(null);
    const [openWorkoutId, setOpenWorkoutId] = useState(null);
    const [workoutData, setWorkoutData] = useState([]); // État pour stocker les données des workouts

    useEffect(() => {
         
      const fetchHostedWorkouts = async () => {
        try {
          const data = await getData(`/users/${user_id}`);
          if (data && data.hosted_workouts) {
            const fetchedWorkoutData = await Promise.all(data.hosted_workouts.map(async (workout) => {
              const workoutDetails = await getData(`/workouts/${workout.id}`);
              console.log(workoutDetails);
              return {
                ...workout,
                category: workoutDetails.category,
                available_places: workoutDetails.available_places,
                reservations: workoutDetails.reservations.map(reservation => ({
                  ...reservation.user,
                  reservationId: reservation.id,
                  status: reservation.status
                }))
              };
            }));
            setWorkoutData(fetchedWorkoutData); // Mettre à jour l'état avec les données récupérées
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
          toast.error("Erreur lors de la récupération des données");
        }
      };
  
      if (user.isLogged) {
        fetchHostedWorkouts();
      }
    }, [user, user_id]);
    

    useEffect(() => {
      const deleteWorkout = async (workoutId) => {
        console.log("Delete workout called with ID:", workoutId);
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette séance d\'entraînement ?')) {
          try {
            const response = await deleteData(`/workouts/${workoutId}`);
            if (response === null) {
              console.log("Deletion succeeded, updating state");
              setWorkoutData(prevWorkouts => prevWorkouts.filter(workout => workout.id !== workoutId));
              toast.success("Séance d\'entraînement supprimée avec succès");
            }
          } catch (error) {
            console.error('Erreur lors de la suppression de la séance d\'entraînement:', error);
            toast.error("Erreur lors de la suppression de la séance d\'entraînement");
          }
        }
      };

        if (workoutIdToDelete !== null) {
            deleteWorkout(workoutIdToDelete);
            setWorkoutIdToDelete(null);
        }
    }, [workoutIdToDelete]);

    const handleDeleteWorkout = (workoutId) => {
        setWorkoutIdToDelete(workoutId);
    };

    const toggleAccordion = (id) => {
        setOpenWorkoutId(openWorkoutId === id ? null : id);
    };

    const updateReservationStatus = async (workoutId, reservationId, newStatus) => {
        try {
            const response = await updateData(`/reservations/${reservationId}`, { status: newStatus });
            if (response) {
                setWorkoutData(workoutData.map(workout => {
                    if (workout.id === workoutId) {
                        return {
                            ...workout,
                            reservations: workout.reservations.map(reservation => {
                                if (reservation.reservationId === reservationId) {
                                    return { ...reservation, status: newStatus };
                                }
                                return reservation;
                            })
                        };
                    }
        return workout;
      }));
      toast.success("Statut de réservation mis à jour avec succès");
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut de la réservation:', error);
    toast.error("Erreur lors de la mise à jour du statut de la réservation");
  }
};

  if(!workoutData){
    <div>Loading...</div>
  }

  // Fonction pour marquer le workout comme fermé
const closeWorkout = async (workoutId) => {
  try {
    const response = await updateData(`/workouts/${workoutId}`, { is_closed: true });
    console.log(response);
    if (response) {
      // Mettre à jour l'état local pour refléter la fermeture du workout
      setWorkoutData(workoutData.map(workout => {
        if (workout.id === workoutId) {
          return { ...workout, is_closed: true };
        }
        return workout;
      }));
      toast.success('La séance a été marquée comme terminée');
    }
  } catch (error) {
    console.error('Erreur lors de la fermeture de la séance:', error);
    toast.error('Erreur lors de la fermeture de la séance');
  }
};


  return (
    <>
      <div className="background-blue-500">
        <h1 className="text-4xl">Mes Annonces</h1>
      </div>
      {workoutData && workoutData.length > 0 ? (
      <div className="flex flex-col gap-4 p-4">
        {workoutData && workoutData.map((workout) => (
          <div key={workout.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-5">
              <button onClick={() => toggleAccordion(workout.id)} className="text-xl font-semibold mb-2 w-full text-left">
                {workout.title}<br/>
                Crée le: {formatDate(workout.created_at) +" à "+ formatTime(workout.created_at)}
              </button>
        
          
        {openWorkoutId === workout.id && (
                <>
                  
                  <p className="text-gray-600 mb-4">
                  Date et heure de création du workout: {formatDate(workout.created_at) +" à "+ formatTime(workout.created_at)}
                  </p>
                  <p className="text-gray-600 mb-4">Prix: {parseFloat(workout.price).toFixed(2)}€</p>
                  <p className="text-gray-600 mb-4">Ville: {(workout.city)}</p>
                  <p className="text-gray-600 mb-4">Code Postal: {(workout.zip_code)}</p>
                  <p className="text-gray-600 mb-4">Nombre de participants maximum: {(workout.max_participants)}</p>
                  <p className="text-gray-600 mb-4">Durée: {formatDuration(workout.duration)}</p>
                  <p className="text-gray-600 mb-4">Date et heure de début: {formatDate(workout.start_date) +" à "+ formatTime(workout.start_date)}
                  </p>
                  <p className="text-gray-600 mb-4">Places disponibles: {workout.available_places}</p>
                  <p className="text-gray-600 mb-4">Catégorie: {workout.category.name}</p>
                  
                  
                  <ul className="mb-4">
                        {workout.reservations.map(reservation => (
                            <li key={reservation.reservationId} className="flex justify-between items-center mb-2">
                                <span>Client: 
                                    <Link to={`/profile/${reservation.id}`} className="text-blue-600 hover:text-blue-800 ml-2">
                                        {reservation.username}
                                    </Link>
                          </span>
                          <span>Statut: {reservation.status}</span>
                                                
                          <div>
                              <button 
                                  onClick={() => updateReservationStatus(workout.id, reservation.reservationId, 'accepted')}
                                  className={`text-white font-medium rounded-lg text-sm px-3 py-1 mr-2 ${['pending', 'relaunched'].includes(reservation.status) ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-500 cursor-not-allowed'}`} 
                                  disabled={!['pending', 'relaunched'].includes(reservation.status)}
                              >
                                  Accepter
                              </button>
                              <button 
                                  onClick={() => updateReservationStatus(workout.id, reservation.reservationId, 'refused')}
                                  className={`text-white font-medium rounded-lg text-sm px-3 py-1 mr-2 ${['pending', 'relaunched'].includes(reservation.status) ? 'bg-red-500 hover:bg-red-700' : 'bg-gray-500 cursor-not-allowed'}`} 
                                  disabled={!['pending', 'relaunched'].includes(reservation.status)}
                              >
                                  Refuser
                              </button>
                              <button 
                                onClick={() => closeWorkout(workout.id)}
                                className={`text-white font-medium rounded-lg text-sm px-3 py-1 ${!workout.is_closed ? 'bg-red-500 hover:bg-red-700' : 'bg-gray-500 cursor-not-allowed'}`}
                                disabled={workout.is_closed}
                              >
                                Clôturer la séance
                              </button>
                              {/* boutton annuler =>workout.isclosed && reservation.status === "host_cancelled" */}
                          </div>
                          {workout.is_closed && reservation.status === 'closed' && (
                              <CreateUserRatings
                                workoutId={workout.id}
                                participantId={reservation.id} // Passez l'ID du participant ici
                              />
                            )}
                          </li>
                      ))}
                      </ul>
                    </>
                  )}
                  <div>
                    <Link to={`/workouts/${workout.id}/edit`}>
                      <button 
                        className={`text-white font-medium rounded-lg text-sm px-3 py-1 mr-2 ${workout.reservations.every(r => ['pending', 'relaunched'].includes(r.status)) ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-gray-500 cursor-not-allowed'}`}
                        disabled={!workout.reservations.every(r => ['pending', 'relaunched'].includes(r.status))}
                      >
                        Modifier votre séance
                      </button>
                    </Link>
                    <button 
                      onClick={() => handleDeleteWorkout(workout.id)}
                      className={`text-white font-medium rounded-lg text-sm px-3 py-1 ${workout.reservations.every(r => ['pending', 'relaunched'].includes(r.status)) ? 'bg-red-500 hover:bg-red-700' : 'bg-gray-500 cursor-not-allowed'}`}
                      disabled={!workout.reservations.every(r => ['pending', 'relaunched'].includes(r.status))}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
             ) : (
              <div className="bg-gray-100 flex items-center justify-center min-h-screen">
              <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <h3 className="text-2xl font-bold text-red-600 mb-4">Vous n'avez pas encore d'Annonce</h3>
              </div>
          </div>
            )}
          </>
        );
      }
       
    export default HostedWorkoutHistory;