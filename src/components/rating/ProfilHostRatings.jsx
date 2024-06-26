import React from 'react';
import { Link } from 'react-router-dom';
import './RatingStars.css';

export default function RatingStars({ ratings }) {
  const renderStars = (rating) => {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? '★' : '☆';
    }
    return stars;
  };

  return (
    <div>
      {ratings.map((rating) => {
        // Ajout d'un log pour déboguer
        console.log('Rating data:', rating);

        return (
          <div key={rating.id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
              <div className="p-8">
                <div className="stars text-yellow-600">
                  {renderStars(rating.rating)}
                </div>
                <div className="tracking-wide text-sm text-indigo-500 font-semibold">
                  Rated by User of workout ID: {rating.user && rating.user.username ? 
                    <Link to={`/profile/${rating.user_id}`} className="text-blue-500 hover:underline">{rating.user.username}</Link> 
                    : 'Unknown'}
                </div>
                <p className="block mt-1 text-lg leading-tight font-medium text-black">Rateable Type: {rating.rateable_type}</p>
                <p className="mt-2 text-gray-500">Rateable ID: {rating.rateable_id}</p>
                <p className="mt-2 text-gray-500">Workout ID: {rating.workout_id}</p>
                <p className="mt-2 text-gray-500">{rating.comment}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}