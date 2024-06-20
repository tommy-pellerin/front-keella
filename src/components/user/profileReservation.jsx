import React from 'react'
import { useParams } from 'react-router-dom';
import { getData } from '../../services/data-fetch';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';

function profileReservation() {
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
    <div>
        {/* Reservations List A mettre ailleurs*/}
        <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className='md-4'>Réservations</h2>
                {profile.reservations?.length > 0 ? (
                    <div className="space-y-4">
                        {profile.reservations.map(reservation => (
                            <div key={reservation.id} className="border p-4 rounded-lg">
                                <img src={reservation.workout.image_url}/>
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
  )
}

export default profileReservation