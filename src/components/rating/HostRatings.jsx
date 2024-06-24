import React, { useState, useEffect } from 'react';
import { getData } from '../../services/data-fetch';
import './RatingStars.css';

export default function RatingStars({userId}) {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchRatings = async () => {
      
      const data = await getData(`/ratings?rateable_type=User&rateable_id=${userId}`);
      setRatings(data);
    };
  
    fetchRatings();
  }, []);

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
        </div>
      ))}
    </div>
  );
}

