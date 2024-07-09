import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../static/LoadingSpinner';
import CreateWorkoutRatings from '../rating/CreateWorkoutRatings'
import { useParams, Link } from 'react-router-dom';
import { getData, updateData } from '../../services/data-fetch';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';
import { formatDate, formatTime, formatDuration } from '../../services/time-fixes';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

function ProfileReservation() {
    const [user] = useAtom(userAtom);
    const [profile, setProfile] = useState(null);
    const { user_id } = useParams();

    useEffect(() => {
        const profileData = async () => {
            try {
                const data = await getData(`/users/${user_id}`);
                setProfile(data);
            } catch (error) {
                console.error(error);
            }
        };
        profileData();
    }, [user, user_id]);

    const handlePay = async (reservationId) => {
        if (window.confirm("Vous confirmez que la séance est terminé ?")) {
            try {
                const newStatus = "closed";
                await updateData(`/reservations/${reservationId}`, { status: newStatus });
                const data = await getData(`/users/${user_id}`);
                setProfile(data);
                toast.success("Merci d'avoir confirmer la fin de la séance, nous allons proceder au paiement de l'hote");
            } catch (error) {
                // console.error('Erreur lors de la mise à jour du statut de la réservation:', error);
                toast.error("Erreur lors de la mise à jour du statut de la réservation");
            }
        }
    };

    const handleCancel = async (reservationId) => {
        if (window.confirm("Etes vous sure de vouloir annuler cette réservation ?")) {
            try {
                const newStatus = "user_cancelled";
                await updateData(`/reservations/${reservationId}`, { status: newStatus });
                const data = await getData(`/users/${user_id}`);
                setProfile(data);
                toast.success("Vous avez bien annulé votre réservation");
            } catch (error) {
                // console.error('Erreur lors de la mise à jour du statut de la réservation:', error);
                toast.error("Erreur lors de la mise à jour du statut de la réservation");
            }
        }
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

    const sortedParticipatedWorkouts = profile.participated_workouts?.sort((a, b) => new Date(a.start_date) - new Date(b.start_date)) || [];
    const sortedReservations = profile.reservations?.sort((a, b) => new Date(a.created_at) - new Date(b.created_at)) || [];

    const combinedReservations = sortedReservations.map(reservation => ({
        workout: sortedParticipatedWorkouts.find(workout => workout.id === reservation.workout_id),
        reservation
    }));

    return (
        <>
            <Helmet>
                <title>Keella | Mes réservations</title>
                <meta name="description" content="L'historique de mes réservations où je peux annuler ou contacter l'hote" />
            </Helmet>
            <div className='mx-auto'>
                <div className='bg-blue-500 text-white text-center py-10 mb-8'>
                    <h2 className='text-4xl'>Mes Réservations</h2>
                </div>
                <div className="flex flex-col items-center">
                    {combinedReservations.length > 0 ? (
                        combinedReservations.map(({ workout, reservation }) => (
                            <div key={`workout-${workout.id}-reservation-${reservation.id}`} className="w-full lg:w-3/4 p-2 flex justify-between rounded-lg shadow-md mb-4">
                                <div className="w-1/2 p-4 text-start">
                                    <h3>{workout.title}<br /></h3>
                                    <p>{truncateDescription(workout.description)}</p>
                                    <p><strong>Date</strong> : {formatDate(workout.start_date)} à {formatTime(workout.start_date)}</p>
                                    <p><strong>Ville</strong>  : {workout.city}</p>
                                    <p><strong>Durée</strong>  : {formatDuration(workout.duration)}</p>
                                    <p><strong>Hote</strong>  : <Link to={`/profile/${workout.host_id}`} className="text-blue-600 hover:text-blue-800 ml-2 hover:underline">{workout.host.username}</Link></p>
                                    
                                    <button 
                                        onClick={() => {
                                            const email = workout.host.email;
                                            const subject = encodeURIComponent("Keella: contact au sujet de votre workout");
                                            const body = encodeURIComponent("Bonjour, \n\nVotre message ici.");
                                            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
                                        }}
                                        className='button-primary-small mt-2'>
                                            Contacter l&apos;hote
                                    </button>
                                    
                                </div>
                                {reservation && (
                                    <div className="w-1/2 p-4 text-end">
                                        <p>Quantité : {reservation.quantity}</p>
                                        {reservation.status === "pending" && <p>Status : En attente</p>}
                                        {reservation.status === "accepted" && <p>Status : Accepté</p>}
                                        {reservation.status === "refused" && <p>Status : Refusé</p>}
                                        {reservation.status === "host_cancelled" || reservation.status === "user_cancelled" && <p>Status : Annulé</p>}
                                        {reservation.status === "closed" || reservation.status === "relaunched" && <p>Status : Fermé</p>}
                                        <p>Prix Total : {reservation.total} €</p>
                                        {reservation.status === "accepted" && (
                                            <>
                                                <button className='button-green-small' onClick={() => handlePay(reservation.id)}>Confirmer fin séance</button>
                                                <button className='button-red-small' onClick={() => handleCancel(reservation.id)}>Annuler</button>
                                            </>
                                        )}
                                        {reservation.status === "pending" && (
                                            <>
                                                <button className='button-red-small' onClick={() => handleCancel(reservation.id)}>Annuler</button>
                                            </>
                                        )}
                                        {reservation.status === "refused" && (
                                            <p className="inline-flex justify-center items-center gap-x-2 py-2 px-3 text-sm font-semibold rounded-lg border-0 bg-gray-400">
                                                L'hote a refusé votre demande de réservation
                                            </p>
                                        )}
                                        {reservation.status === "host_cancelled" && (
                                            <p className="inline-flex justify-center items-center gap-x-2 py-2 px-3 text-sm font-semibold rounded-lg border-0 bg-gray-400">
                                                L'hote a annulé la séance
                                            </p>
                                        )}
                                        {reservation.status === "user_cancelled" && (
                                            <p className="inline-flex justify-center items-center gap-x-2 py-2 px-3 text-sm font-semibold rounded-lg border-0 bg-gray-400">
                                                Vous avez annulé votre réservation
                                            </p>
                                        )}
                                        {reservation.status === "closed" && (
                                            <p className="inline-flex justify-center items-center gap-x-2 py-2 px-3 text-sm font-semibold rounded-lg border-0 bg-gray-400">
                                                L'évènement est fini
                                            </p>
                                        )}
                                        {reservation.status === "closed" && (
                                            <div className='mt-1'>
                                                <CreateWorkoutRatings workoutId={workout.id} />
                                            </div>
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
        </>
    );
}

export default ProfileReservation;
