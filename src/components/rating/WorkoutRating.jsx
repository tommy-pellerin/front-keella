import React, { useState, useEffect } from 'react';
import { getData } from '../../services/data-fetch';
import './RatingStars.css';

export default function WorkoutRating({ workoutId }) {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      console.log(`Fetching ratings for workout ID: ${workoutId}`); // Log avant de récupérer les données
      const data = await getData(`/ratings?rateable_type=Workout&rateable_id=${workoutId}`);
      console.log('Data received:', data); // Log après la réception des données
      
      // Filtrer les évaluations pour ne garder que celles liées au workoutId actuel
      const filteredRatings = data.filter(rating => rating.workout_id === workoutId);
      console.log('Filtered Ratings:', filteredRatings); // Log après le filtrage des données
      
      setRatings(filteredRatings);
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