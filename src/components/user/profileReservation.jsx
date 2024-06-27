import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../static/LoadingSpinner';
import CreateWorkoutRatings from '../rating/CreateWorkoutRatings';
import { useParams } from 'react-router-dom';
import { getData, updateData } from '../../services/data-fetch';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';
import { alertAtom } from '../../store/alert';
import Alert from '../../styles/Alert';
import '../rating/RatingStars.css';

function ProfileReservation() {
    const [user] = useAtom(userAtom);
    const [profile, setProfile] = useState(null);
    const [alertState, setAlertState] = useAtom(alertAtom);
    
    const { user_id } = useParams();

    useEffect(() => {
        const profileData = async () => {
            try {
                const data = await getData(`/users/${user_id}`);
                const updatedReservations = [];
                let hostedWorkout = null;
    
                for (const reservation of data.reservations) {
                    const workoutData = await getData(`/workouts/${reservation.workout_id}`);
                updatedReservations.push({ 
                    ...reservation, 
                    is_closed: workoutData.is_closed,
                    host_id: workoutData.host_id 
                });
                    // Si la réservation est fermée et que c'est un workout hébergé, enregistrez les détails
                    if (workoutData.is_closed && workoutData.host_id === user_id) {
                        hostedWorkout = workoutData;
                    }
                }
    
                // Mettez à jour le profil avec les réservations et le workout hébergé
                setProfile({ ...data, reservations: updatedReservations, hostedWorkout });
            } catch (error) {
                console.error(error);
            }
        };
        profileData();
    }, [user, user_id]);

            

    const handlePay = async(reservationId) => {
        console.log(`Paying host for reservation ${reservationId}`);
        if(window.confirm("Vous confirmez que la séance est terminé ?")) {
            try {
                const newStatus = "closed"; // Status for user_cancelled
                const response = await updateData(`/reservations/${reservationId}`, { status: newStatus });
                const data = await getData(`/users/${user_id}`);
                setProfile(data);
                setAlertState({
                    showAlert: true,
                    message: "Merci d'avoir confirmer la fin de la séance, nous allons proceder au paiement de l'hote",
                    alertType: 'success'
                });
            } catch (error) {
                console.error('Erreur lors de la mise à jour du statut de la réservation:', error);
                setAlertState({
                    showAlert: true,
                    message: 'Erreur lors de la mise à jour du statut de la réservation',
                    alertType: 'error'
                });
            }
            }
    };

   

    const handleCancel = async(reservationId) => {
        console.log(`Cancelling reservation ${reservationId}`);
        if(window.confirm("Are you sure you want to delete this reservation?")) {
        try {
            const newStatus = "user_cancelled"; // Status for user_cancelled
            const response = await updateData(`/reservations/${reservationId}`, { status: newStatus });
            const data = await getData(`/users/${user_id}`);
            setProfile(data);
            setAlertState({
                showAlert: true,
                message: 'Vous avez bien annulé votre réservation',
                alertType: 'success'
              });
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut de la réservation:', error);
            setAlertState({
              showAlert: true,
              message: 'Erreur lors de la mise à jour du statut de la réservation',
              alertType: 'error'
            });
        }
        }
    };

    const handleRelaunch = (reservationId) => {
        console.log(`Relaunching host for reservation ${reservationId}`);
    };

    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    }

    function formatTime(dateString) {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleTimeString('fr-FR', options);
    }

    if (!profile) {
        return <div><LoadingSpinner /></div>;
    }


    return (
        <div className='mx-auto'>
        <Alert
          showAlert={alertState.showAlert}
          setShowAlert={(show) => setAlertState((prevState) => ({ ...prevState, showAlert: show }))}
          message={alertState.message}
          type={alertState.alertType}
        />
            <div className='bg-blue-500 text-white text-center py-10 mb-8'>
                <h2 className='text-4xl'>Mes Réservations</h2>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2 p-2">
                    <div className="space-y-4 text-start">
                        {profile.participated_workouts?.length > 0 ? (
                            profile.participated_workouts.map(reservation => (
                                <div key={reservation.id} className="p-4 rounded-lg">
                                    <p className="text-description">{reservation.title}<br />{reservation.description}</p>
                                    <p>Date : {formatDate(reservation.start_date)} à {formatTime(reservation.start_date)}</p>
                                    <p>Ville : {reservation.city}</p>
                                    <p>Durée : {reservation.duration} minutes</p>
                                </div>
                            ))
                        ) : (
                    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                            <h3 className="text-2xl font-bold text-red-600 mb-4">Vous n'avez pas de Réservation</h3>
                        </div>
                    </div>
                        )}
                    </div>
                </div>
                <div className="w-full lg:w-1/2 p-2">
                    <div className="space-y-4 text-end">
                        {profile.reservations?.length > 0 ? (
                            profile.reservations.map(reservation =>{
                                
                                const canRelaunch = new Date(reservation.created_at) <= new Date(Date.now() - 12 * 60 * 60 * 1000);
                            return (
                                <div key={reservation.id} className="p-4 rounded-lg">
                                    <p>Quantité : {reservation.quantity}</p>
                                    <p>Status : {reservation.status}</p>
                                    <p className="prix-total clearfix">Prix Total : {reservation.total} €</p>
                                    <div className="ratings-container">
                                    {reservation.is_closed && (
                                        <CreateWorkoutRatings workoutId={reservation.workout_id} />
                                        )}
                                    
                                    
                                    </div>
                                    {reservation.status === "accepted" ?
                                    <>
                                        <button className='button-green-small' onClick={() => handlePay(reservation.id)}>Confirmer fin séance</button>
                                        <button className='button-red-small' onClick={() => handleCancel(reservation.id)}>annuler</button>
                                    </>
                                    :
                                    <></>
                                    }
                                    {reservation.status === "pending" ?
                                    <>
                                        <button className='button-primary-small' onClick={() => handleRelaunch(reservation.id)} disabled={!canRelaunch}>relancer l'hote</button>
                                        <button className='button-red-small' onClick={() => handleCancel(reservation.id)}>annuler</button>
                                    </>
                                    :
                                    <></>
                                    }
                                    {reservation.status === "refused" ?
                                    <>
                                        <button className='button-red-small'>L'hote n'as pas accepter votre réservation</button>
                                    </>
                                    :
                                    <></>
                                    }
                                    {reservation.status === "host_cancelled" ?
                                    <>
                                        <button className='button-red-small'>L'hote a annulé sa réservation</button>
                                    </>
                                    :
                                    <></>
                                    }
                                    {reservation.status === "user_cancelled" ?
                                    <>
                                        <button className='button-red-small disable'>Vous avez annulé votre réservation</button>
                                    </>
                                    :
                                    <></>
                                    }
                                    {reservation.is_closed ? (
                                            
                                        
                                    <>
                                    <button className='button-red-small'>L'évènement est fini</button>
                                    
                                    
                                    </>
                                    
                                    <></>
                                
                                    {reservation.status === "relaunched" ?
                                    <>
                                        <button className='button-red-small'>l'évènement est relancer</button>
                                    </>
                                    :
                                    <></>
                                    }
                                </div>
                            );
                        })
                        ) : (
                            <div>
                            </div>
                        )}
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default ProfileReservation;
