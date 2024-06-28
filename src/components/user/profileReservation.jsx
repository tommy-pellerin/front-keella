import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../static/LoadingSpinner';
import { useParams } from 'react-router-dom';
import { getData, updateData } from '../../services/data-fetch';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';
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
                const newStatus = "closed"; // Status for user_cancelled
                const response = await updateData(`/reservations/${reservationId}`, { status: newStatus });
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
                const newStatus = "user_cancelled"; // Status for user_cancelled
                const response = await updateData(`/reservations/${reservationId}`, { status: newStatus });
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
            <div className='bg-blue-500 text-white text-center py-10 mb-8'>
                <h2 className='text-4xl'>Mes Réservations</h2>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2 p-2">
                    <div className="space-y-4 text-start">
                        {profile.participated_workouts?.length > 0 ? (
                            <div>
                                {profile.participated_workouts.map(reservation => (
                                    <div key={reservation.id} className="p-4 rounded-lg border mb-4">
                                        <p><strong>ID:</strong> {reservation.id}</p>
                                        <p>{reservation.title}<br />{reservation.description}</p>
                                        <p>Date : {formatDate(reservation.start_date)} à {formatTime(reservation.start_date)}</p>
                                        <p>Ville : {reservation.city}</p>
                                        <p>Durée : {reservation.duration} minutes</p>
                                    </div>
                                ))}
                            </div>
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
                            <div>
                                {profile.reservations.map(reservation => (
                                    <div key={reservation.id} className="p-4 rounded-lg border mb-4">
                                        <p><strong>ID:</strong> {reservation.workout_id}</p>
                                        <p>Quantité : {reservation.quantity}</p>
                                        <p>Status : {reservation.status}</p>
                                        <p>Prix Total : {reservation.total} €</p>
                                        {reservation.status === "accepted" && (
                                            <>
                                                <button className='button-green-small' onClick={() => handlePay(reservation.id)}>Fin de Séance</button>
                                                <button className='button-red-small' onClick={() => handleCancel(reservation.id)}>annuler</button>
                                            </>
                                        )}
                                        {reservation.status === "pending" && (
                                            <>
                                                <button className='button-primary-small' onClick={() => handleRelaunch(reservation.id)} disabled={true}>En attente de l'hote</button>
                                                <button className='button-red-small' onClick={() => handleCancel(reservation.id)}>annuler</button>
                                            </>
                                        )}
                                        {reservation.status === "refused" && (
                                            <button className='button-red-small'>L'hote n'as pas accepter votre réservation</button>
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
                                            <button className='button-red-small'>l'évènement est relancer</button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileReservation;
