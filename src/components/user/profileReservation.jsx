import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../static/LoadingSpinner';

import { useParams } from 'react-router-dom';
import { getData } from '../../services/data-fetch';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';

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

    const handlePay = (reservation) => {
        console.log(`Paying for reservation ${reservation}`);

    };

    const handleCancel = (reservationId) => {
        console.log(`Cancelling reservation ${reservationId}`);
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
            <div className='bg-blue-500'>
                <h2 className='md-4'>Mes Réservations</h2>
            </div>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2 p-2">
                    <div className="space-y-4 text-start">
                        {profile.participated_workouts?.length > 0 ? (
                            profile.participated_workouts.map(reservation => (
                                <div key={reservation.id} className="p-4 rounded-lg">
                                    <p>{reservation.title}<br />{reservation.description}</p>
                                    <p>Date : {formatDate(reservation.start_date)} à {formatTime(reservation.start_date)}</p>
                                    <p>Ville : {reservation.city}</p>
                                    <p>Durée : {reservation.duration} minutes</p>
                                </div>
                            ))
                        ) : (
                            <div><LoadingSpinner /></div>
                        )}
                    </div>
                </div>
                <div className="w-full lg:w-1/2 p-2">
                    <div className="space-y-4 text-end">
                        {profile.reservations?.length > 0 ? (
                            profile.reservations.map(reservation => (
                                <div key={reservation.id} className="p-4 rounded-lg">
                                    <p>Quantité : {reservation.quantity}</p>
                                    <p>Status : {reservation.status}</p>
                                    <p>Prix Total : {reservation.total} €</p>
                                    {reservation.status === "accepted" ?
                                    <>
                                        <button className='button-green-small' onClick={() => handlePay(reservation.id)}>payer</button>
                                        <button className='button-red-small' onClick={() => handleCancel(reservation.id)}>annuler</button>
                                    </>
                                    :
                                    <></>
                                    }
                                    {reservation.status === "pending" ?
                                    <>
                                        <button className='button-primary-small' onClick={() => handleRelaunch(reservation.id)}>relancer l'hote</button>
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
                                        <button className='button-red-small'>Vous avez annulé votre réservation</button>
                                    </>
                                    :
                                    <></>
                                    }
                                    {reservation.status === "closed" ?
                                    <>
                                        <button className='button-red-small'>L'évènement est fini</button>
                                    </>
                                    :
                                    <></>
                                    }
                                    {reservation.status === "relaunched" ?
                                    <>
                                        <button className='button-red-small'>l'évènement est relancer</button>
                                    </>
                                    :
                                    <></>
                                    }
                                </div>
                            ))
                        ) : (
                            <div>
                                <LoadingSpinner />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileReservation;
