import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../../services/data-fetch';

const WorkoutList = forwardRef(({ searchResults }, ref) => {
    const [workouts, setWorkouts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);

    const getWorkouts = async () => {
        try {
            const data = await getData(`/workouts?sort=start_date&page_size=${visibleCount}`);
            console.log(data);
            setWorkouts(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!searchResults) {
            getWorkouts();
        } else {
            setWorkouts(searchResults);
        }
    }, [searchResults, visibleCount]);

    useImperativeHandle(ref, () => ({
        fetchDefaultWorkouts: getWorkouts
    }));

    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 3);
    };

    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString('fr-FR', options);
    }

    function formatTime(dateString) {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleTimeString('fr-FR', options);
    }

    return (
        <div className='max-w-screen-lg mx-auto p-4'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
                {workouts.slice(0, visibleCount).map((workout) =>
                    <Link key={workout.id} className="flex flex-col bg-slate border shadow-sm rounded-xl " to={`/workouts/${workout.id}`}>
                        {workout.image_url ?
                            <>
                                <img className="w-full h-auto rounded-t-xl" src={workout.image_url} alt={workout.title}></img>
                            </>
                            :
                            <>
                                <img className="w-full h-auto rounded-t-xl" src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D" alt="Image Description"></img>
                            </>}
                        <div className="p-4 md:p-5">
                            <h3 className="text-lg font-bold text-gray-800">
                                {workout.title}
                            </h3>
                            <p className="mt-1 text-gray-500 text-description">
                                {workout.description}
                            </p>
                            <ul>
                                <li className="mt-1 text-gray-500 ">Prix : {workout.price} €</li>
                                <li className="mt-1 text-gray-500 ">Durée : {workout.duration} Mins</li>
                                <li className="mt-1 text-gray-500 ">Nombre de place total : {workout.max_participants}</li>
                                <li className="mt-1 text-gray-500 ">Date : {formatDate(workout.start_date)}</li>
                                <li className="mt-1 text-gray-500 ">Heure : {formatTime(workout.start_date)}</li>
                            </ul>
                            {workout.available_places > 0 ?
                            <><button className='button-primary-small'>{workout.available_places} places disponible</button></>
                            :
                            <><button className='button-red-small'> Plus de places disponible</button></>
                            }
                        </div>
                    </Link>
                )}
            </div>
            <div className="flex justify-center mt-6">
                <button onClick={loadMore} className="py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    Load More
                </button>
            </div>
        </div>
    )
});

export default WorkoutList;
