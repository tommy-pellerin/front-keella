import React from 'react';
import './RatingStars.css';

const UserAverageRating = ({ ratings }) => {
  // Calcul de la moyenne des notes
  const averageRating = ratings.length
    ? (ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length).toFixed(1)
    : 'Pas encore noté';

    const renderStars = (averageRating) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
          stars.push(
            <span key={i} className={i < averageRating ? "star selected" : "star"}>
              {i < averageRating ? '★' : '☆'}
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