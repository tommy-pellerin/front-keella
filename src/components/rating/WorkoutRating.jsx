import React, { useState, useEffect } from 'react';
import { getData } from '../../services/data-fetch';
import { Link } from 'react-router-dom';
import './RatingStars.css';

export default function WorkoutRating({ workoutId }) {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      console.log(`Fetching ratings for workout ID: ${workoutId}`); // Log before fetching data
      const data = await getData(`/ratings?rateable_type=Workout&rateable_id=${workoutId}`);
      console.log('Data received:', data); // Log after receiving data
      
      // Filtre les évaluations pour ne conserver que celles qui ont le bon workoutId
      const filteredRatings = data.filter(
        rating => rating.rateable_type === "Workout" && rating.rateable_id === workoutId
      );
      console.log('Filtered Ratings:', filteredRatings); // Log after filtering data
      
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
          <p>Rated by: {rating.user ? 
            <Link to={`/profile/${rating.user.id}`}>{rating.user.username}</Link> 
            : 'Unknown'}</p>
          <p>Rateable Type: {rating.rateable_type}</p>
          <p>Rateable ID: {rating.rateable_id}</p>
          <p>Workout ID: {rating.workout_id}</p>
        </div>
      ))}
    </div>
  );
}