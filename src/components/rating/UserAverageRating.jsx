import React from 'react';
import './RatingStars.css';

const UserAverageRating = ({ averageRating, totalRatings }) => {
  const renderStar = (average) => {
    return (
      <>
        <span className="star selected text-yellow-600">★</span>
        <span>{' ' + average.toFixed(1) + '/5'}</span>
      </>
    );
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '1rem'}}>
      <div style={{ display: 'inline-block' }}>
        {renderStar(averageRating)}
        <span>{` (${totalRatings})`}</span>
      </div>
    </div>
  );
};

export default UserAverageRating;