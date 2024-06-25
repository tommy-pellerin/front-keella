import React, { useState } from 'react';
import { postData } from '../../services/data-fetch';
import './RatingStars.css';

export default function CreateWorkoutRatings({ workoutId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
      rateable_type: 'Workout',
      rateable_id: workoutId,
      workout_id: workoutId,
      rating,
      comment,
    };

    try {
      const response = await postData('/ratings', newRating);
      console.log('Rating created:', response);
      setSuccess(true);
      setRating(0);
      setComment('');
    } catch (err) {
      console.error('Error creating rating:', err);
      setError('Error creating rating.');
    }
  };

  return (
    <div className="create-rating">
      <h2>Create Workout Rating</h2>
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
    </div>
  );
}