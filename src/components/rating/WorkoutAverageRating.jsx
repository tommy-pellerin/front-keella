import React from 'react';
import './RatingStars.css'; 

const WorkoutAverageRating = ({ averageRating, totalRatings }) => {
  const renderStar = (average) => {
    return (
      <span className="star selected text-yellow-600">★ {average.toFixed(1)}/5</span>
    );
  };

  return (
    <div className="create-rating" style={{ textAlign: 'center', marginBottom: '1rem' }}>
      
      <div style={{ display: 'inline-block' }}>
        {totalRatings > 0 ? renderStar(averageRating) : <p>Il n'y a pas de notes pour cette séance.</p>}
        {totalRatings > 0 && <span> ({totalRatings})</span>}
      </div>
    </div>
  );
};

export default WorkoutAverageRating;