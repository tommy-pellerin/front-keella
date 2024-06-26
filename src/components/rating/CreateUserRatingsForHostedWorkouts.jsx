import React, { useState } from 'react';
import { postData } from '../../services/data-fetch';
import './RatingStars.css';

export default function CreateUserRatings({ hostId, workoutId, }) {
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
        rateable_type: 'User', // Type d'entité évaluée
        rateable_id: hostId, // ID de l'utilisateur évalué
        workout_id: workoutId, // ID du workout associé à l'évaluation
        rating, // Note attribuée
        comment, // Commentaire laissé
      }
    };

    console.log('Submitting rating:', newRating);

    try {
      const response = await postData('/ratings', newRating);
      console.log('Rating response:', response); // Log the response for debugging
      setSuccess(true);
      setRating(0);
      setComment('');
    } catch (err) {
      console.error('Error creating rating:', err);
      const errorMsg = err.response ? await err.response.json() : 'Error creating rating.';
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
        Note et commente ton hôte
      </h2>
      {isOpen && (
        <>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">Rating created successfully!</p>}
          <form onSubmit={handleSubmit} className="form-container">
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