import React, { useState, useEffect } from 'react';
import { postData, getData } from '../../services/data-fetch';
import './RatingStars.css';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';

export default function CreateWorkoutRatings({ workoutId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasCommented, setHasCommented] = useState(false);
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const checkCommentExistence = async () => {
      try {
        
        const response = await getData(`/ratings?workoutId=${workoutId}`);
        if (response.length > 0) {
          setHasCommented(response.some(rating => rating.user.id === user.id));
        }
      } catch (err) {
        console.error('Error checking rating existence:', err);
        setError('Unable to check if you have already rated this workout.');
      }
    };
    if (user.isLogged) {
      checkCommentExistence();
    }

    checkCommentExistence();
  }, [workoutId, user.isLogged, user.id]);
  
  
  
  
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

    if (hasCommented) {
      setError('You have already commented on this workout.');
      return;
    }

    const newRating = {
      rating: {
        rateable_type: 'Workout',
        rateable_id: workoutId,
        workout_id: workoutId,
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
      setHasCommented(true);
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
        Note et commente ta séance !
      </h2>
      {isOpen && (
        <>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">Commentaire crée avec succès!</p>}
          {!hasCommented ? (
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
              <button type="submit">Envoyer</button>
            </form>
          ) : (
            <p className="error">Vous avez déjà noté ce participant.</p>
          )}
        </>
      )}
    </div>
  );
}