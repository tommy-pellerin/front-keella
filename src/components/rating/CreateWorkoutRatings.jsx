import { useState, useEffect } from 'react';
import { postData, getData } from '../../services/data-fetch';
import './RatingStars.css';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';
import RatingModal from './RatingModal';

export default function CreateWorkoutRatings({ workoutId }) {
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

  useEffect(() => {
    const checkIfCommented = async () => {
      if (user.isLogged) {
        try {
          const response = await getData(`/ratings?workoutId=${workoutId}`);
          console.log('Response:', response); // Affiche la réponse complète
          const userHasCommented = response.some(rating => {
            // console.log('Rating:', rating); // Affiche les détails du rating
            return rating.rateable_id === workoutId && rating.user_id === user.id;
          });
          console.log('Has the user already commented:', userHasCommented); // Affiche si l'utilisateur a déjà commenté
          setHasCommented(userHasCommented);
        } catch (err) {
          console.error('Error fetching ratings:', err);
          setError('Unable to verify previous comments.');
        }
      }
    };
  
    checkIfCommented();
  }, [workoutId, user]);



  // Fonction pour basculer l'état de l'accordéon
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      
      <button onClick={toggleAccordion} className='button-primary-small'>
        Note et commente ta séance !
      </button>

      <RatingModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">Commentaire crée avec succès!</p>}
        {!hasCommented ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div className='text-left'>
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
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength="500"
              placeholder="Laissez un commentaire (500 caracteres max)"
              className="w-full h-36"
            />
            <div>
              <button type="submit" className='button-green-large'>Envoyer</button>
            </div>
          </form>
        ) : (
          <p className="error">Vous avez déjà noté cette séance.</p>
        )}
          
      </RatingModal>
    </>
  );
}