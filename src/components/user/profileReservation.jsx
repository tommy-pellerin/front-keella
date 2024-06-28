import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../static/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { getData, updateData } from '../../services/data-fetch';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';
import { formatDate, formatTime, formatDuration } from '../../services/time-fixes';
import { toast } from 'react-toastify';

function ProfileReservation() {
    const [user] = useAtom(userAtom);
    const [profile, setProfile] = useState(null);
    const { user_id } = useParams();

    useEffect(() => {
        const profileData = async () => {
            try {
                const data = await getData(`/users/${user_id}`);
                console.log("user: ", data);
                setProfile(data);
            } catch (error) {
                console.error(error);
            }
        };
        profileData();
    }, [user, user_id]);

    const handlePay = async (reservationId) => {
        console.log(`Paying host for reservation ${reservationId}`);
        if (window.confirm("Vous confirmez que la séance est terminé ?")) {
            try {
                const newStatus = "closed";
                await updateData(`/reservations/${reservationId}`, { status: newStatus });
                const data = await getData(`/users/${user_id}`);
                setProfile(data);
                toast.success("Merci d'avoir confirmer la fin de la séance, nous allons proceder au paiement de l'hote");
            } catch (error) {
                console.error('Erreur lors de la mise à jour du statut de la réservation:', error);
                toast.error("Erreur lors de la mise à jour du statut de la réservation");
            }
        }
    };

    const handleCancel = async (reservationId) => {
        console.log(`Cancelling reservation ${reservationId}`);
        if (window.confirm("Are you sure you want to delete this reservation?")) {
            try {
                const newStatus = "user_cancelled";
                await updateData(`/reservations/${reservationId}`, { status: newStatus });
                const data = await getData(`/users/${user_id}`);
                setProfile(data);
                toast.success("Vous avez bien annulé votre réservation");
            } catch (error) {
                console.error('Erreur lors de la mise à jour du statut de la réservation:', error);
                toast.error("Erreur lors de la mise à jour du statut de la réservation");
            }
        }
    };

    const handleRelaunch = (reservationId) => {
        console.log(`Relaunching host for reservation ${reservationId}`);
    };
    function truncateDescription(description, maxWords = 50) {
        const words = description.split(' ');
        return words.length > maxWords 
            ? words.slice(0, maxWords).join(' ') + '...' 
            : description;
    }

    if (!profile) {
        return <div><LoadingSpinner /></div>;
    }

    const sortedParticipatedWorkouts = profile.participated_workouts?.sort((a, b) => a.id - b.id) || [];
    const sortedReservations = profile.reservations?.sort((a, b) => a.workout_id - b.workout_id) || [];

    const combinedReservations = sortedParticipatedWorkouts.map(workout => ({
        workout,
        reservation: sortedReservations.find(reservation => reservation.workout_id === workout.id)
    }));

    return (
        <div className='mx-auto'>
            <div className='bg-blue-500 text-white text-center py-10 mb-8'>
                <h2 className='text-4xl'>Mes Réservations</h2>
            </div>
            <div className="flex flex-col items-center">
                {combinedReservations.length > 0 ? (
                    combinedReservations.map(({ workout, reservation }) => (
                        <div key={`workout-${workout.id}`} className="w-full lg:w-3/4 p-2 flex justify-between rounded-lg shadow-md mb-4">
                            <div className="w-1/2 p-4 text-start">
                                <h3>{workout.title}<br /></h3>
                                <p>{truncateDescription(workout.description)}</p>
                                <p> <strong>Date</strong> : {formatDate(workout.start_date)} à {formatTime(workout.start_date)}</p>
                                <p><strong>Ville</strong>  : {workout.city}</p>
                                <p><strong>Durée</strong>  : {formatDuration(workout.duration)}</p>
                            </div>
                            {reservation && (
                                <div className="w-1/2 p-4 text-end">
                                    <p>Quantité : {reservation.quantity}</p>
                                    {reservation.status === "pending" ?<p>Status : En attente</p> : null}
                                    {reservation.status === "accepted" ?<p>Status : Accepté</p> : null}
                                    {reservation.status === "refused" ?<p>Status : Refusé</p> : null}
                                    {reservation.status === "host_cancelled" ||reservation.status === "user_cancelled" ?<p>Status : Annulé</p> : null}
                                    {reservation.status === "closed" ||reservation.status === "relaunched" ?<p>Status : Fermé</p> : null}
                                    <p>Prix Total : {reservation.total} €</p>
                                    {reservation.status === "accepted" && (
                                        <>
                                            <button className='button-green-small' onClick={() => handlePay(reservation.id)}>Confirmer fin séance</button>
                                            <button className='button-red-small' onClick={() => handleCancel(reservation.id)}>Annuler</button>
                                        </>
                                    )}
                                    {reservation.status === "pending" && (
                                        <>
                                            <button className='button-primary-small' onClick={() => handleRelaunch(reservation.id)} disabled={true}>Relancer l'hote</button>
                                            <button className='button-red-small' onClick={() => handleCancel(reservation.id)}>Annuler</button>
                                        </>
                                    )}
                                    {reservation.status === "refused" && (
                                        <button className='button-red-small'>L'hote n'a pas accepté votre réservation</button>
                                    )}
                                    {reservation.status === "host_cancelled" && (
                                        <button className='button-red-small'>L'hote a annulé sa réservation</button>
                                    )}
                                    {reservation.status === "user_cancelled" && (
                                        <button className='button-red-small disable'>Vous avez annulé votre réservation</button>
                                    )}
                                    {reservation.status === "closed" && (
                                        <button className='button-red-small'>L'évènement est fini</button>
                                    )}
                                    {reservation.status === "relaunched" && (
                                        <button className='button-red-small'>L'évènement est relancé</button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                            <h3 className="text-2xl font-bold text-red-600 mb-4">Vous n'avez pas de Réservation</h3>
                        </div>
                )}
            </div>
        </div>
    );
}

export default ProfileReservation;
