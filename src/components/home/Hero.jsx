import React from 'react';
import heroBackgroundImage from '../../assets/images/herobackgroundimage.png'; 

const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-blue-500 md:h-[50vh] mb-5">
      
      <div className="w-full mx-auto md:w-1/3 flex flex-col items-center justify-center p-4">
        <h1 className="text-white text-3xl md:text-7xl font-bold mb-4">Réservez, bougez, vivez !</h1>
        <p className="max-w-md text-white">
          Découvrez et réservez la séance de sport parfaite pour votre prochaine aventure.
        </p>
      </div>

      <div className="md:w-1/2 flex justify-end bg-white h-full overflow-hidden"> 
        <img src={heroBackgroundImage} alt="Hero Background" className="object-scale-down h-full w-full" />
      </div>
    </div>
  );
};

export default Hero;