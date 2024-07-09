import React from 'react';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const feedbacks = [
  // Ajoutez ici les commentaires et les notes des utilisateurs
  { id: 1, text: "Une journée inoubliable ! Quelle journée fantastique ! Entre les conseils d’experts et l’ambiance conviviale, je n’aurais pas pu rêver mieux. C’est certain, je reviendrai très bientôt !", rating: 5 },
  { id: 2, text: "Incroyable expérience ! J’ai été totalement bluffé par la qualité du service. Les équipements étaient top-notch et l’accueil chaleureux m’a fait sentir comme un VIP. Je recommande vivement !", rating: 4 },
  // ...
];

const UserFeedback = () => {
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(false);
  const length = feedbacks.length;

  const nextSlide = () => {
    setAnimate(false); // Réinitialiser l'animation
    setCurrent(current === feedbacks.length - 1 ? 0 : current + 1);
    requestAnimationFrame(() => setAnimate(true)); // Redéclencher l'animation
  };

  const prevSlide = () => {
    setAnimate(false); // Réinitialiser l'animation
    setCurrent(current === 0 ? feedbacks.length - 1 : current - 1);
    requestAnimationFrame(() => setAnimate(true)); // Redéclencher l'animation
  };

  if (!Array.isArray(feedbacks) || feedbacks.length <= 0) {
    return null;
  }

  return (
    <div className='relative flex flex-col items-center'>
      <h2 className='text-3xl text-center font-bold text-gray-800 my-6'>
        Ce que nos utilisateurs pensent de nous
      </h2>
      <div className='flex justify-center items-center'>
        {/* Chevron Icons */}
        {feedbacks.map((feedback, index) => {
          return (
            <div className={index === current ? 'slide active' : 'slide'} key={feedback.id}>
              {index === current && (
              <div className='p-8 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-x-4 relative'>
                {/* ChevronLeftIcon */}
                <ChevronLeftIcon className='h-12 w-12 absolute top-1/2 left-0 transform md:-translate-x-full -translate-y-1/2 text-gray-800 cursor-pointer' onClick={prevSlide} />
                {/*  Avatar */}
                <div className={`${animate ? 'fadeIn' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <div className='font-medium text-black'>{feedback.text}</div>
                    {/* Rating Stars */}
                  </div>
                  <div className='text-yellow-400 text-lg'>
                    {'★'.repeat(feedback.rating)}
                    {'☆'.repeat(5 - feedback.rating)}
                  </div>
                </div>
                {/* ChevronRightIcon */}
                <ChevronRightIcon className='h-12 w-12 absolute top-1/2 right-0 transform md:translate-x-full -translate-y-1/2 text-gray-800 cursor-pointer' onClick={nextSlide} />
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