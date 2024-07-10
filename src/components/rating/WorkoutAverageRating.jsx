import React from 'react';
import './RatingStars.css'; 

const WorkoutAverageRating = ({ averageRating, totalRatings }) => {
  const renderStars = (average) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < Math.round(average) ? "star selected text-yellow-600" : "star"}>
          {i < Math.round(average) ? '★' : '☆'}
        </span>
      );
    }
    return <div className="stars">{stars}</div>;
  };

  return (
    <div className="create-rating" style={{ textAlign: 'center', marginBottom: '1rem' }}>
      
      <div style={{ display: 'inline-block' }}>
        {renderStars(averageRating)}
        <span>{` (${totalRatings})`}</span>
      </div>
    </div>
  );
};

export default WorkoutAverageRating;