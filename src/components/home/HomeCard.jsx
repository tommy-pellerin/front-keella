import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../../services/data-fetch';

import { formatDate, formatTime, formatDuration } from '../../services/time-fixes';

function CardHome() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const data = await getData(`/workouts?sort=start_date&page_size=3`);
        const sortedData = data.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
        setWorkouts(sortedData);
      } catch (error) {
        console.error(error);
      }
    };
    getWorkouts();
  }, []);

  return (
    <div className='max-w-screen-lg mx-auto p-4'>
        <h2 className="text-2xl font-bold text-center my-6">
          Voici des séances proches de chez vous
        </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
        {workouts.slice(0, 3).map((workout) => (
          <div key={workout.id} className="flex flex-col bg-slate border shadow-sm rounded-xl ">
            
            <img className="w-full h-auto rounded-t-xl" src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D" alt="Image Description"></img>
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-800">
                {workout.title}
              </h3>
              <p className="mt-1 text-gray-500 text-description">
                {workout.description}
              </p>
              <ul>
                <li className="mt-1 text-gray-500 ">Prix : {workout.price}</li>
                <li className="mt-1 text-gray-500 ">Durée : {formatDuration(workout.duration)}</li>
                <li className="mt-1 text-gray-500 ">Nombre de place : {workout.max_participants}</li>
                <li className="mt-1 text-gray-500 ">Date : {formatDate(workout.start_date)}</li>
              </ul>
              <Link className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent button-primary-small disabled:opacity-50 disabled:pointer-events-none" to={`/workouts/${workout.id}`}>
                S'inscrire
              </Link>
            </div>
          </div>
        ))}
        <div className="text-center mt-8 col-span-full">
          <Link to="/workouts" className="button-primary-large">
            Voir tous les Workouts
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardHome;