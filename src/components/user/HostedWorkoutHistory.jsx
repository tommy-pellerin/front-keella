import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';
import { getData, deleteData, updateData } from '../../services/data-fetch';
import { formatDate, formatTime, formatDuration, formatTimeToLocalTime } from '../../services/time-fixes';
import {toast} from 'react-toastify';
import { Helmet } from 'react-helmet';

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
                // console.error('Erreur lors de la récupération des données de l\'utilisateur:', error);
                toast.error("Erreur lors de la récupération des données");
            }
        };
    
        fetchHostedWorkouts(); // Appeler la fonction de récupération des entraînements hébergés
    
    }, [user, user_id]);
    

    useEffect(() => {
      const deleteWorkout = async (workoutId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette séance d\'entraînement ?')) {
          try {
            const response = await deleteData(`/workouts/${workoutId}`);
            if (response === null) {
              setWorkoutData(prevWorkouts => prevWorkouts.filter(workout => workout.id !== workoutId));
              toast.success("Séance d\'entraînement supprimée avec succès");
            }
          } catch (error) {
            // console.error('Erreur lors de la suppression de la séance d\'entraînement:', error);
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
      // Demander confirmation
      const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer définitivement cette annonce ?");
      if (isConfirmed) {
        setWorkoutIdToDelete(workoutId);
      } else {
        // Si l'utilisateur n'a pas confirmé, ne rien faire
        return
      }
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
          // console.error('Erreur lors de la mise à jour du statut de la réservation:', error);
          toast.error("Erreur lors de la mise à jour du statut de la réservation");
        }
    };

    // on ne peut annuler une réservation que si la réservation n'est pas closed
    const handleReservationCancel = (workout) => {
      // Demander confirmation
      const isConfirmed = window.confirm("Êtes-vous sûr de vouloir annuler toutes les réservations ?");
      if (isConfirmed) {
        //itérer sur chaque réservation afin de procéder à l'annulation de toutes les réservations
        workout.reservations.map(reservation => {
          console.log(reservation.status);
          if(reservation.status === "closed"){
            // on ne peut pas annuler une reservation dont le status est cloturé
            console.log("status closed");
            return;
          } else if (reservation.status === "user_cancelled" || reservation.status === "host_cancelled"){
            console.log("status user ou host cancelled");
            // on ne peut pas annuler une reservation dont le client ou l'hote a déja annulé
            return;
          } else if (reservation.status === "refused"){
            console.log("status refused");
            // on ne peut pas annuler une reservation dont la resservation a été refusée
            return;
          }
          updateReservationStatus(workout.id, reservation.reservationId, "host_cancelled");
        });
      } else {
        // Si l'utilisateur n'a pas confirmé, ne rien faire
        return;
      }
    }

  return (
    <>
      <Helmet>
          <title>Keella | Mes annonces</title>
          <meta name="description" content="Page mes annnonces où je peux voir mes annonces et accepter ou refuser une demande de réservation" />
      </Helmet>
      
      <div className="background-blue-500">
        <h1 className="text-4xl">Mes Annonces</h1>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {workoutData && workoutData.map((workout) => (
          <div key={workout.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-5">
              <button onClick={() => toggleAccordion(workout.id)} className="mb-2 w-full text-left">
                <h2>{workout.title}</h2>
                <p>             
                Date et heure de début: <strong>{formatDate(workout.start_date) +" à "+ formatTime(workout.start_date)}</strong>
                </p>  
                <p>
                Nombre de réservation : <strong>{workout.reservations.length}</strong>, dont <strong>{workout.reservations.filter(reservation => reservation.status === "pending").length}</strong> en attente de réponse
                </p>
              </button>
        
          
        {openWorkoutId === workout.id && (
                <>
                  
                  <p className="text-gray-600 mb-1">
                  Date et heure de création du workout: {formatDate(workout.created_at) +" à "+ formatTime(workout.created_at)}
                  </p>
                  <p className="text-gray-600 mb-1">Prix: {parseFloat(workout.price).toFixed(2)}€</p>
                  <p className="text-gray-600 mb-1">Ville: {(workout.city)}</p>
                  <p className="text-gray-600 mb-1">Code Postal: {(workout.zip_code)}</p>
                  <p className="text-gray-600 mb-1">Nombre de participants maximum: {(workout.max_participants)}</p>
                  <p className="text-gray-600 mb-1">Durée: {formatDuration(workout.duration)}</p>
                  <p className="text-gray-600 mb-1">Date et heure de début: {formatDate(workout.start_date) +" à "+ formatTime(workout.start_date)}
                  </p>
                  <p className="text-gray-600 mb-1">Places disponibles: {workout.available_places}</p>
                  <p className="text-gray-600 mb-1">Catégorie: {workout.category.name}</p>
                  
                  
                  <div className="mb-4">
                      {workout.reservations && workout.reservations.map(reservation => (
                          <div key={reservation.reservationId} className="flex flex-col md:flex-row justify-between items-center mb-2">
                            <div className='py-1'>Client: 
                                <Link to={`/profile/${reservation.id}`} className="text-blue-600 hover:text-blue-800 ml-2">
                                    {reservation.username}
                                </Link>
                            </div>
                            <div className='py-1'>Statut: {reservation.status}</div>
                                                
                            <div className='py-1'>
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
                                    onClick={() => {
                                      const email = reservation.email;
                                      const subject = encodeURIComponent("Keella: contact au sujet de votre réservation");
                                      const body = encodeURIComponent("Bonjour, \n\nVotre message ici.");
                                      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
                                  }}
                                    className={'text-white font-medium rounded-lg text-sm px-3 py-1 mr-2 bg-blue-500 hover:bg-blue-700'} 
                                >
                                    Contacter client
                                </button>
                            </div>
                          </div>
                      ))}
                      </div>
                    </>
                  )}
                  <div>

                    <Link to={`/workouts/${workout.id}/edit`}>
                      <button 
                        title={!workout.reservations.some(reservation => reservation.status === 'pending' || reservation.status === 'accepted' || reservation.status === 'closed') ? "Modifier cette séance" : "Vous ne pouvez pas modifier un workout ayant des réservations en cours, si vous souhaiter supprimer le workout, veuillez annuler toutes les réservations en cours"}
                        className={`text-white font-medium rounded-lg text-sm px-3 py-1 my-1 mx-1 ${!workout.reservations.some(reservation => reservation.status === 'pending' || reservation.status === 'accepted' || reservation.status === 'closed') ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-gray-500 cursor-not-allowed'}`}
                        disabled={workout.reservations.some(reservation => reservation.status === 'pending' || reservation.status === 'accepted' || reservation.status === 'closed')}
                      >
                        Modifier votre annonce
                      </button>
                    </Link>
                    <button 
                      title={!workout.reservations.some(reservation => reservation.status === 'pending' || reservation.status === 'accepted') ? "Supprimer cette séance" : "Vous ne pouvez pas supprimer un workout ayant des réservations en cours, si vous souhaiter supprimer le workout, veuillez annuler toutes les réservations en cours"}
                      onClick={() => handleDeleteWorkout(workout.id)}
                      className={`text-white font-medium rounded-lg text-sm px-3 mx-1 my-1 py-1 ${!workout.reservations.some(reservation => reservation.status === 'pending' || reservation.status === 'accepted') ? 'bg-red-500 hover:bg-red-700' : 'bg-gray-500 cursor-not-allowed'}`}
                      disabled={workout.reservations.some(reservation => reservation.status === 'pending' || reservation.status === 'accepted')}
                    >
                      Supprimer l&apos;annonce
                    </button>
                    
                    <button 
                      title={workout.reservations.length < 1 || workout.is_closed || !workout.reservations.some(reservation => reservation.status === 'pending' || reservation.status === 'accepted') ? "Vous ne pouvez pas annuler les réservations de ce workout" : "Annuler toutes les réservations"}
                      onClick={() => handleReservationCancel(workout)}
                      className={`text-white font-medium rounded-lg text-sm px-3 mx-1 my-1 py-1 ${workout.reservations.length < 1 || workout.is_closed || !workout.reservations.some(reservation => reservation.status === 'pending' || reservation.status === 'accepted') ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700' }`}
                      disabled={
                        workout.reservations.length < 1 || workout.is_closed || !workout.reservations.some(reservation => reservation.status === 'pending' || reservation.status === 'accepted')
                      }
                    >
                      Annuler toutes les réservations
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
    );
}

export default HostedWorkoutHistory;
