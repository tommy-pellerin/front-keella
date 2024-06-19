import React from 'react';
import heroBackgroundImage from '../../assets/images/herobackgroundimage.png'; 

const Hero = () => {
    return (
      <div className="flex flex-row-reverse">
        <div className="w-1/2 flex justify-end"> 
          <img src={heroBackgroundImage} alt="Hero Background" className="object-cover h-full" />
        </div>
        <div className="w-1/3 flex flex-col justify-start"> 
          <div className="text-left mt-20"> 
            <h1 className="text-4xl font-bold mb-4">Réservez, bougez, vivez !</h1>
            <p className="max-w-md">
              Découvrez et réservez la séance de sport parfaite pour votre prochaine aventure.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Hero;