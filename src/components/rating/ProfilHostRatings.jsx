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
      {ratings.map((rating, index) => (
        <div
          key={rating.id}
          className={`max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl ${index !== ratings.length - 1 ? 'mb-4' : ''}`}
        >
            <div className="md:flex">
              <div className="p-8">
              <div className="tracking-wide text-sm text-indigo-500 font-semibold">
                   {rating.user && rating.user.username ? 
                    <Link to={`/profile/${rating.user_id}`} className="text-blue-500 hover:underline">{rating.user.username}</Link> 
                    : 'Unknown'} vous a laissé un avis
                </div>
                <div className="stars text-yellow-600">
                  {renderStars(rating.rating)}
                </div>
                
                <p className="block mt-1 text-lg leading-tight font-light text-black">{rating.comment}</p>
              </div>
            </div>
          </div>
        
      ))}
    </div>
  );
}