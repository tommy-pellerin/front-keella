import React, { useState, useEffect } from 'react';
import { getData } from '../../services/data-fetch';
import './RatingStars.css';

export default function RatingStars({userId}) {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      console.log(`Fetching ratings for user ID: ${userId}`); // Log before fetching data
      const data = await getData(`/ratings?rateable_type=User&rateable_id=${userId}`);
      console.log('Data received:', data); // Log after receiving data
      
      // Filtrer les évaluations pour ne garder que celles de l'utilisateur actuel
      const filteredRatings = data.filter(rating => rating.user_id === userId);
      console.log('Filtered Ratings:', filteredRatings); // Log after filtering data
      
      setRatings(filteredRatings);
    };
  
    fetchRatings();
  }, [userId]);

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
          <p>{rating.comment}</p>
        </div>
      ))}
    </div>
  );
}

