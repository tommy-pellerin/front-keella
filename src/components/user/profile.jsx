import { useEffect, useState } from 'react';
import LoadingSpinner from '../static/LoadingSpinner'
import { useParams } from 'react-router-dom';
import { getData } from '../../services/data-fetch';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';
import { Link } from 'react-router-dom';
import DeleteAccount from "./delete-account";
import { Helmet } from 'react-helmet';import RatingStars from '../rating/ProfilHostRatings';
import UserAverageRating from '../rating/UserAverageRating';


import { formatDate, formatTime, formatDuration } from '../../services/time-fixes';

function Profile() {
    const [user] = useAtom(userAtom);
    const [profile, setProfile] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
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
    }, [user,user_id]);
    

    if (!profile) {
        return <div><LoadingSpinner/></div>;
    }

    return (
        <>
            <Helmet>
                <title>Keella | Profil</title>
                <meta name="description" content="Page profil" />
            </Helmet>
            <div className="">
            <div className='background-blue-500'>
            <h2 className='text-4xl'>Profil</h2>
            </div>
            <div className="container mx-auto p-4">

                <div className="flex justify-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full lg:w-2/5">
                        <h1 className="mb-4 text-center">Compte de {profile.username}</h1>
                        <UserAverageRating averageRating={parseFloat(profile.average_rating)} />
                    <p className="text-center">Actif depuis : {formatDate(profile.created_at)}</p>
                        {profile.avatar?
                            <img src={profile.avatar}
                            alt="avatar" 
                            className="w-64 h-64 mx-auto mb-4 object-cover shadow-md rounded-lg"
                            ></img>
                        :
                            <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='default img' className="w-64 h-64 mx-auto mb-4 object-cover shadow-md rounded-lg"></img>
                        }
                        {profile.participated_workouts ?
                            <p className="text-center">Nombre de Scéances passés : {profile.participated_workouts?.length}</p>
                        :
                            <p className="text-center">Nombre de Scéances passés : 0</p>
                        }
                    

                        {profile.hosted_workouts ?
                        <p className="text-center">Nombre de Scéances proposé : {profile.hosted_workouts.length}</p>
                            :
                        <p className="text-center">Nombre de Scéances proposé : 0</p>
                        }
                        {user.email === profile.email ?
                        <div>
                            <Link to={`/profile/${user.id}/edit`} className='button-green-large'>Éditer le profil</Link>
                            
                            <div className="border rounded-lg p-4 flex flex-col item-center">
                                <button
                                    className="button-red-small text-center"
                                    onClick={() => setIsDeleteOpen(!isDeleteOpen)}
                                >
                                    Supprimer mon compte
                                </button>
                                {isDeleteOpen && (
                                    <>
                                        <div className="flex justify-center items-center mt-5">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                            </svg>
                                        </div>
                                        <h2 className='text-center max-w-lg'>Vos crédits ne sont pas remboursé automatiquement, veuillez faire une demande à l&apos;aide du bouton contact en bas de page.</h2>

                                        {/* premiere conditoin : vérifie si l'utilisateur a des réservation en cours */}
                                        {!profile.reservations.some(reservation => reservation.status === 'pending' || reservation.status === 'accepted') ?
                                            // 2e condition : vérifie si l'hote a des réservation en cours sur ses workouts
                                            (!profile.hosted_workouts.map(workout => workout.reservations).flat().some(reservation => reservation.status === 'pending' || reservation.status === 'accepted') ?
                                                <DeleteAccount hosted_workouts={user.hosted_workouts} />
                                                :
                                                <Link to={`/my-account/${user.id}/hosted_workouts`} className='text-center text-red-500 max-w-lg underline'>Veuillez refuser ou annuler les réservation en cours</Link>
                                            )
                                        :
                                            <Link to={`/my-account/${user.id}/my-reservation`} className='text-center text-red-500 max-w-lg underline'>Veuillez annuler vos réservations avant de supprimer votre compte</Link>
                                        }
                                    </>
                                )}
                            </div>

                            
                        </div>
                        :
                        <></>
                        }
                    </div>

                    </div>
            </div>
            <RatingStars ratings={profile.ratings_received} />
        

            </div>
        </>
    );
}

export default Profile;
