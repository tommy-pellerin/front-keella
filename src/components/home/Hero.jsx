import React from 'react';
import heroBackgroundImage from '../../assets/images/herobackgroundimage.png'; // Remplacez par le chemin de votre image

const Hero = () => {
    return (
      <div className="relative h-1/2">
        {/* L'image de fond est importée et utilisée ici */}
        <img src={heroBackgroundImage} alt="Hero Background" className="object-cover w-full h-full" />
        <div className="absolute inset-0 flex justify-center items-center ">
          <div className="text-center p-4">
            <h1 className="text-white text-4xl font-bold mb-4">Bienvenue sur le Airbnb du sport</h1>
            <p className="text-white max-w-md mx-auto">
              Découvrez et réservez la séance de sport parfaite pour votre prochaine aventure.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Hero;