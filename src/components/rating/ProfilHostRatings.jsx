import React from 'react';
import { Link } from 'react-router-dom';
import './RatingStars.css';

export default function RatingStars({ ratings, ratingsReceivedUserAvatars }) {
  
  const renderStars = (rating) => {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? '★' : '☆';
    }
    return stars;
  };


 

  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-2xl font-semibold my-4">Les hôtes ont donné leurs avis</h2>
      {ratings.length > 0 ? (
        ratings.map((rating) => {
          // Trouvez l'avatar correspondant à l'évaluation actuelle
          const userAvatar = ratingsReceivedUserAvatars.find(avatar => avatar.rating_id === rating.id)?.user_avatar;
          return (
            <div key={rating.id} className="w-full max-w-md p-4 mb-4">
              <div className="flex items-center space-x-4">
                <div className="h-8 w-8 border rounded-full flex justify-center items-center overflow-hidden">
                  {userAvatar ? (
                    <img src={userAvatar} alt="User avatar" className="h-8 w-8 object-cover" />
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
        <p className="text-lg font-light">Il n'y a pas encore de commentaires pour ce profil.</p>
      )}
    </div>
  );
}