import React from 'react';
import heroBackgroundImage from '../../assets/images/herobackgroundimage.png'; 

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse md:items-center">
      <div className="md:w-1/2 flex justify-end"> 
        <img src={heroBackgroundImage} alt="Hero Background" className="object-cover h-full w-full md:w-auto" />
      </div>
      <div className="md:w-1/3 flex flex-col justify-center items-center md:items-start text-center md:text-left p-4"> 
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Réservez, bougez, vivez !</h1>
        <p className="max-w-md">
          Découvrez et réservez la séance de sport parfaite pour votre prochaine aventure.
        </p>
      </div>
    </div>
  );
};

export default Hero;