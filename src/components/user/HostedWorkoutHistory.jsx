import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';
import { getData, deleteData, updateData } from '../../services/data-fetch';
import { formatDate, formatTime, formatDuration, formatTimeToLocalTime } from '../../services/time-fixes';
import {toast} from 'react-toastify';

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
                const userData = await getData(`/users/${user_id}`);
                if (userData && userData.hosted_workouts) {
                    const fetchedWorkoutData = await Promise.all(userData.hosted_workouts.map(async (workout) => {
                        try {
                            const workoutDetails = await getData(`/workouts/${workout.id}`);
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
                        } catch (error) {
                            console.error('Erreur lors de la récupération des détails de l\'entraînement:', error);
                            throw error; // Re-lancer l'erreur pour la gestion par le bloc catch externe si nécessaire
                        }
                    }));
                    console.log(fetchedWorkoutData);
                    setWorkoutData(fetchedWorkoutData); // Mettre à jour l'état avec les données récupérées
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
                toast.error("Erreur lors de la récupération des données");
            }
        };
    
        fetchHostedWorkouts(); // Appeler la fonction de récupération des entraînements hébergés
    
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
    
    //on ne peut annuler une réservation que si la réservation n'est pas closed
    const handleReservationCancel = (workout) => {
      console.log("reservation cancel", workout);
      console.log(workout.reservations);
      //passer toutes les réservations en "host_cancelled"
      workout.reservations.map(reservation => {
        if(reservation.status === "closed"){
          toast.error("Vous ne pouvez pas annuler un workout don't les réservation sont cloturés");
          return
        }
        console.log(reservation);
        updateReservationStatus(workout.id, reservation.reservationId, "host_cancelled")
      })
      //ensuite passe workout.is_closed === true

    }

  return (
    <>
      <div className="background-blue-500">
        <h1 className="text-4xl">Mes Annonces</h1>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {workoutData && workoutData.map((workout) => (
          <div key={workout.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-5">
              <button onClick={() => toggleAccordion(workout.id)} className="text-xl font-semibold mb-2 w-full text-left">
                {workout.title}<br/>
                Crée le: {formatDate(workout.created_at) +" à "+ formatTimeToLocalTime(workout.created_at)}
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
                      {workout.reservations && workout.reservations.map(reservation => (
                          <li key={reservation.id} className="flex justify-between items-center mb-2">
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
                                    className={`text-white font-medium rounded-lg text-sm px-3 py-1 mr-2 ${['closed', 'host_cancelled', 'user_cancelled'].includes(reservation.status) ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`} 
                                    disabled={['closed', 'host_cancelled', 'user_cancelled'].includes(reservation.status)}
                                >
                                    Contacter client
                                </button>
                            </div>
                          </li>
                      ))}
                      </ul>
                    </>
                  )}
                  <div>
                     {/* Annulation button visible only if there is a workout if not modification and delete is visible */}
                    {workout.reservations.length <= 0 ?
                    <>
                    <Link to={`/workouts/${workout.id}/edit`}>
                      <button 
                        className={`text-white font-medium rounded-lg text-sm px-3 py-1 mx-1 ${workout.reservations.length === 0 ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-gray-500 cursor-not-allowed'}`}
                        disabled={workout.reservations.length > 0}
                      >
                        Modifier votre séance
                      </button>
                    </Link>
                    <button 
                      onClick={() => handleDeleteWorkout(workout.id)}
                      className={`text-white font-medium rounded-lg text-sm px-3 mx-1 py-1 ${workout.reservations.length === 0 ? 'bg-red-500 hover:bg-red-700' : 'bg-gray-500 cursor-not-allowed'}`}
                      disabled={workout.reservations.length > 0}
                    >
                      Supprimer
                    </button>
                    </>

                    :
                    (!workout.is_closed && !workout.reservations.some(reservation => reservation.status === 'closed' || reservation.status === 'host_cancelled') &&
                      <button 
                        onClick={() => handleReservationCancel(workout)}
                        className={`text-white font-medium rounded-lg text-sm px-3 mx-1 py-1 ${!workout.is_closed? 'bg-red-500 hover:bg-red-700' : 'bg-gray-500 cursor-not-allowed'}`}
                        disabled={
                          workout.is_closed || workout.reservations.some(reservation => reservation.status === 'closed' || reservation.status === 'host_cancelled')
                        }
                      >
                        Annuler
                      </button>
                    )
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
    );
}

export default HostedWorkoutHistory;
