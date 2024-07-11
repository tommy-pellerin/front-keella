import React from 'react';
import './RatingStars.css'; 

const WorkoutAverageRating = ({ averageRating, totalRatings }) => {
  const renderStar = (average) => {
    const rating = typeof average === 'number' ? average : parseFloat(average);
  return (
    <>
        <span className="star selected text-yellow-600">★</span>
        <span className="rating-text">{rating.toFixed(1)}/5</span>
      </>
    );
  };

  return (
    <div className="create-rating" style={{ textAlign: 'center', marginBottom: '1rem' }}>
      <div style={{ display: 'inline-block' }}>
        {renderStar(averageRating)}
        <span> ({totalRatings})</span>
      </div>
    </div>
  );
};

export default WorkoutAverageRating;