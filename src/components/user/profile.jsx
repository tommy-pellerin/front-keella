import { useEffect, useState } from 'react';
import LoadingSpinner from '../static/LoadingSpinner'
import { useParams } from 'react-router-dom';
import { getData } from '../../services/data-fetch';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';
import { Link } from 'react-router-dom';

function Profile() {
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
    }, [user,user_id]);
    
    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    }

    if (!profile) {
        return <div><LoadingSpinner/></div>;
    }

    return (
        <div className="">
        <div className='bg-blue-500 text-white text-center py-10 mb-8'>
            <h2 className='md-4'>Profil</h2>
        </div>
        <div className="container mx-auto p-4">

            <div className="flex justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="mb-4 text-center">Compte de {profile.username}</h1>
                    <p className="text-center">Actif depuis : {formatDate(profile.created_at)}</p>
                    {profile.avatar?
                        <img src={profile.avatar}></img>
                    :
                        <img src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt='default img'></img>
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
                    <>
                        <Link to={`/profile/${user.id}/edit`} className='button-green-large'>Éditer le profil</Link>
                    </>
                    :
                    <></>
                    }
                </div>

                    </div>
            </div>
        </div>
    );
}

export default Profile;
