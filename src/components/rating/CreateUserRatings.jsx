import React, { useState } from 'react';
import { postData } from '../../services/data-fetch';
import './RatingStars.css';

export default function CreateUserRatings({ userId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (rating === 0) {
      setError('Please select a rating.');
      return;
    }

    if (comment.length > 500) {
      setError('Comment cannot be longer than 500 characters.');
      return;
    }

    const newRating = {
      rating: {
        rateable_type: 'User', 
        rateable_id: userId, 
        user_id: userId, 
        rating,
        comment,
      }
    };

    console.log('Submitting rating:', newRating);

    try {
      const response = await postData('/ratings', newRating);
      setSuccess(true);
      setRating(0);
      setComment('');
    } catch (err) {
      console.error('Error creating rating:', err);
      const errorMsg = err.response ? await err.response.json() : 'Error creating rating.';
      console.error('Server error:', errorMsg);
      setError(errorMsg.error || 'Error creating rating.');
    }
  };

  // Fonction pour basculer l'état de l'accordéon
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="create-rating">
      <h2 onClick={toggleAccordion} style={{ cursor: 'pointer' }}>
        Laisse une note et commentaire à ton hote
      </h2>
      {isOpen && (
        <>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">Rating created successfully!</p>}
          <form onSubmit={handleSubmit}>
            <div className="stars">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`star ${i < rating ? 'selected' : ''}`}
                  onClick={() => setRating(i + 1)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength="500"
              placeholder="Leave a comment (max 500 characters)"
            />
            <button type="submit">Submit Rating</button>
          </form>
        </>
      )}
    </div>
  );
}