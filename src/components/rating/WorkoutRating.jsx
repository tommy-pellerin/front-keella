import React, { useState, useEffect } from 'react';
import { getData } from '../../services/data-fetch';
import { Link } from 'react-router-dom';
import './RatingStars.css';

export default function WorkoutRating({ workoutId }) {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      console.log(`Fetching ratings for workout ID: ${workoutId}`); // Log before fetching data
      const data = await getData(`/workouts/${workoutId}`);
      console.log('Data received:', data); // Log after receiving data
      
      // Utilisez 'ratings_received' pour accéder aux évaluations
      const workoutRatings = data.ratings_received || [];
      console.log('Workout Ratings:', workoutRatings); // Log after accessing ratings
      
      setRatings(workoutRatings);
    };

    fetchRatings();
  }, [workoutId]);


  const renderStars = (rating) => {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? '★' : '☆';
    }
    return stars;
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-xl font-semibold my-4">Les utilisateurs ont donné leurs avis</h2>
      {ratings.length > 0 ? (
        ratings.map((rating) => (
          <div key={rating.id} className="w-full max-w-md p-4 mb-4">
            <div className="flex items-center space-x-4">
              {rating.user_avatar ? (
                <img src={rating.user_avatar} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="User avatar" className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center">
                  {/* Icône SVG par défaut si aucun avatar n'est fourni */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
              )}
              <div className="flex flex-col">
                <Link to={`/profile/${rating.user_id}`} className="text-blue-500 hover:underline">
                  {rating.user && rating.user.username ? rating.user.username : 'Unknown'}
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-600">{renderStars(rating.rating)}</span>
                  <span className="text-gray-600">{new Date(rating.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <p className="mt-2 text-lg font-light">{rating.comment}</p>
          </div>
        ))
      ) : (
        <p>Aucun avis n'a été laissé pour cet entraînement.</p>
      )}
    </div>
  );
}