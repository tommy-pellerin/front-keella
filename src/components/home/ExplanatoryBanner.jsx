import React, { useState } from 'react';
import banner from '../../assets/images/banner.png';
import { Link } from 'react-router-dom';

const ExplanatoryBanner = () => {
  const [isEquipmentOpen, setIsEquipmentOpen] = useState(false);
  const [isUsageOpen, setIsUsageOpen] = useState(false);

  return (
    <div className='py-5'>
      <h2 className="text-center font-bold text-2xl">Avec Keella, tout les monde y gagne !</h2>
      <div className="flex flex-col md:flex-row justify-between items-center max-w-screen-lg mx-auto pb-4'">
        {/* Image responsive */}
        <img src={banner} alt="activity" className="w-full md:w-1/2" />

        {/* Cartes responsives */}
        <div className="w-full md:w-1/2 space-y-4">
          
          {/* Carte pour les sportifs */}
          <div className="border rounded-lg p-4">
            <button
              className="font-bold text-lg"
              onClick={() => setIsEquipmentOpen(!isEquipmentOpen)}
            >
              Pour les sportifs
            </button>
            {isEquipmentOpen && (
              <div>
                <p className="mt-2">
                  En tant que sportif, profitez de la flexibilité de louer l'équipement sportif dont vous avez besoin, 
                  où que vous soyez. Parfait pour essayer de nouveaux sports ou pour des séances de sport lors de vos voyages.
                </p>
                <Link to="/workouts" className="button-primary-large text-white font-bold py-2 px-4 rounded block mt-4">
                  Voir les Workouts
                </Link>
              </div>
            )}
          </div>

          {/* Carte pour les hôtes */}
          <div className="border rounded-lg p-4">
            <button
              className="font-bold text-lg"
              onClick={() => setIsUsageOpen(!isUsageOpen)}
            >
              Pour les hôtes
            </button>
            {isUsageOpen && (
              <div>
                <p className="mt-2">
                  En tant que hôte, créez des activités uniques ou proposez votre matériel à la location. 
                  C'est une excellente manière de gagner un revenu supplémentaire tout en aidant les autres à découvrir de nouveaux sports.
                </p>
                
                <Link to="/workouts/create" className="button-primary-large text-white font-bold py-2 px-4 rounded block mt-4">
                  Créer un Workout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplanatoryBanner;