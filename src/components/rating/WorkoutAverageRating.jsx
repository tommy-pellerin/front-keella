import React from 'react';
import './RatingStars.css'; // Assurez-vous que le chemin d'accès est correct

const WorkoutAverageRating = ({ averageRating }) => {
  const renderStars = (averageRating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < Math.round(averageRating) ? "star selected" : "star"}>
          {i < Math.round(averageRating) ? '★' : '☆'}
        </span>
      );
    }
    return <div className="stars">{stars}</div>;
  };

  return (
    <div className="create-rating">
      <h2>Note Moyenne du Workout</h2>
      {renderStars(averageRating)}
    </div>
  );
};

export default WorkoutAverageRating;