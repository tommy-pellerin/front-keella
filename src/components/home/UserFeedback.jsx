import React from 'react';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const feedbacks = [
  // Ajoutez ici les commentaires et les notes des utilisateurs
  { id: 1, text: "Commentaire 1", rating: 5 },
  { id: 2, text: "Commentaire 2", rating: 4 },
  // ...
];

const UserFeedback = () => {
  const [current, setCurrent] = useState(0);
  const length = feedbacks.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(feedbacks) || feedbacks.length <= 0) {
    return null;
  }

  return (
    <div className='relative flex flex-col items-center'>
      <h2 className='text-3xl font-bold text-gray-800 my-6'>
        Ce que nos utilisateurs pensent de nous
      </h2>
      <div className='flex justify-center items-center'>
        <ChevronLeftIcon className='h-12 w-12 absolute top-1/2 left-10 text-gray-800 cursor-pointer' onClick={prevSlide} />
        <ChevronRightIcon className='h-12 w-12 absolute top-1/2 right-10 text-gray-800 cursor-pointer' onClick={nextSlide} />
        {feedbacks.map((feedback, index) => {
          return (
            <div className={index === current ? 'slide active' : 'slide'} key={feedback.id}>
              {index === current && (
                <div className='p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-x-4'>
                  <div className='text-xl font-medium text-black'>{feedback.text}</div>
                  <div className='text-gray-500'>Note: {feedback.rating}/5</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserFeedback;