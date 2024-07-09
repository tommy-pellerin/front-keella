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
          <div key={rating.id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="md:flex">
            <div className="p-8">
            <div className="tracking-wide text-sm text-indigo-500 font-semibold">
                <p> {rating.user ? 
                  <Link to={`/profile/${rating.user_id}`}className="text-blue-500 hover:underline">{rating.user.username}</Link> 
                  : 'Unknown'} a laissé son avis :</p>
                </div>
              <div className="stars text-yellow-600">
                  {renderStars(rating.rating)}
                </div>                     
                <p className="block mt-1 text-lg leading-tight font-light text-black">{rating.comment}</p>
                                  
              </div>
            </div>
          </div>
      );
    })}
    </div>
  );
}