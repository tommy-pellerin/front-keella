import React, { useState, useEffect } from 'react';
import { postData, getData } from '../../services/data-fetch';
import './RatingStars.css';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';



export default function CreateUserRatings({ workoutId, participantId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasCommented, setHasCommented] = useState(false);
  const [user] = useAtom(userAtom);

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
        rateable_id: participantId, // ID de l'utilisateur évalué
        workout_id: workoutId, // ID du workout associé à l'évaluation
        rating, 
        comment, 
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
      const errorMsg = err.response ? await err.response.json() : 'Vous avez déjà laisser une note ou un commentaire'
      setError(errorMsg.error || 'Vous avez déjà laisser une note ou un commentaire.');
    }
  };

  // Fonction pour basculer l'état de l'accordéon
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const checkCommentExistence = async () => {
      try {
        // Modifier l'URL pour inclure le participantId et le workoutId
        const response = await getData(`/ratings?participantId=${participantId}&workoutId=${workoutId}`);
        if (response.length > 0) {
          // Vérifiez si l'utilisateur actuel a déjà noté le participant spécifié
          setHasCommented(response.some(rating => rating.user.id === user.id && rating.rateable_id === participantId));
        }
      } catch (err) {
        console.error('Error checking rating existence:', err);
        setError('Unable to check if you have already rated this participant.');
      }
    };

    if (user.isLogged) {
      checkCommentExistence();
    }
  }, [workoutId, participantId, user.isLogged, user.id]);



  return (
    <div className="create-rating">
      <h2 onClick={toggleAccordion} style={{ cursor: 'pointer' }}>
        Note et commente le participant
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