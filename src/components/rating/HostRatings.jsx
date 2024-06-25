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
      {ratings.map((rating) => (
        <div key={rating.id} className="rating">
          <div className="stars" style={{ color: 'yellow' }}>
            {renderStars(rating.rating)}
          </div>
          <p>Rated by: {rating.user ? 
            <Link to={`/profile/${rating.user.id}`}>{rating.user.username}</Link> 
            : 'Unknown'}</p>
          <p>Rateable Type: {rating.rateable_type}</p>
          <p>Rateable ID: {rating.rateable_id}</p>
          <p>Workout ID: {rating.workout_id}</p>
          <p>{rating.comment}</p>
        </div>
      ))}
    </div>
  );
}