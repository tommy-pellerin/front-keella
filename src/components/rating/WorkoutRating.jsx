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
    <div>
      {ratings.map((rating) => {
        // Log pour chaque évaluation individuelle
        console.log('Rendering rating:', rating);
        return (
        <div key={rating.id} className="rating">
          <div className="stars" style={{ color: 'yellow' }}>
            {renderStars(rating.rating)}
          </div>
          <p>{rating.comment}</p>
          <p>Rated by: {rating.user ? 
            <Link to={`/profile/${rating.user_id}`}>{rating.user.username}</Link> 
            : 'Unknown'}</p>
          {/* Vérification des valeurs avant de les afficher */}
            <p>Rateable Type: {rating.rateable_type || 'Not provided'}</p>
            <p>Rateable ID: {rating.rateable_id || 'Not provided'}</p>
            <p>Workout ID: {rating.workout_id || 'Not provided'}</p>
        </div>
      );
    })}
    </div>
  );
}