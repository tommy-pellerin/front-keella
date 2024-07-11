import React, { useState, useEffect } from 'react';
import { getData } from '../../services/data-fetch';
import { Link } from 'react-router-dom';
import './RatingStars.css';


export default function WorkoutRating({ workoutId, ratingsReceivedUserAvatars }) {
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
    <div className="w-full flex flex-col items-start px-5">
      <h2 className="text-xl font-semibold my-4 text-center">Les utilisateurs ont donné leurs avis</h2>
      {ratings.length > 0 ? (
        ratings.map((rating) => {
          const userAvatar = ratingsReceivedUserAvatars.find(avatar => avatar.rating_id === rating.id)?.user_avatar;
          return (
            <div key={rating.id} className="w-full max-w-md p-4 mb-4">
              <div className="flex items-center space-x-4">
              <div className="h-8 w-8 border rounded-full flex justify-center items-center overflow-hidden">
                  {userAvatar ? (
                    <img src={userAvatar} alt="User avatar" className="object-cover" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  )}
                </div>
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
          );
    })
      ) : (
        <p>Aucun avis n'a été laissé pour cet entraînement.</p>
      )}
    </div>
  );
}