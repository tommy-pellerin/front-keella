import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../services/data-fetch';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';

function UserProfile() {
    const [user] = useAtom(userAtom);
    const [profile, setProfile] = useState(null);

    const { urlprofile } = useParams();

    useEffect(() => {
        const profileData = async () => {
            try {
                const data = await getData(`/users/${urlprofile}`);
                console.log("user: ", data);
                setProfile(data);
            } catch (error) {
                console.error(error);
            }
        };
        profileData();
    }, [user,urlprofile]);

    if (!profile) {
        return <div>Loading ...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* User Profile Card */}
                <div className="md:col-span-1 bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold mb-4">Compte de {profile.username}</h1>
                    <p>Inscrit depuis : {profile.created_at}</p>
                    <p>Inscrit depuis : {profile.participated_workouts}</p>
                    {user.email === profile.email ?
                    <>
                        <a className='button-green-large'>Éditer le profil</a>
                    </>
                    :
                    <>non</>
                    }
                </div>

                {/* Reservations List */}
                <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Réservations</h2>
                    {profile.reservations?.length > 0 ? (
                        <div className="space-y-4">
                            {profile.reservations.map(reservation => (
                                <div key={reservation.id} className="border p-4 rounded-lg">
                                    <p>{reservation.workout.title}<br />{reservation.workout.description}</p>
                                    <p>Place Réservé : {reservation.quantity}</p>
                                    <p>Prix Total : {reservation.total} €</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No reservations found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
