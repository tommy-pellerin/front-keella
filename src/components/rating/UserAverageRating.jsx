import React from 'react';
import './RatingStars.css';

const UserAverageRating = ({ averageRating }) => {
  const renderStars = (average) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < Math.round(average) ? "star selected" : "star"}>
          {i < Math.round(average) ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="create-rating">
      <p>Moyenne des Notes</p>
      <div className="stars">
        {renderStars(averageRating)}
      </div>
    </div>
  );
};

export default UserAverageRating;