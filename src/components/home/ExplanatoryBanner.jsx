import React, { useState } from 'react';

const ExplanatoryBanner = () => {
  const [isEquipmentOpen, setIsEquipmentOpen] = useState(false);
  const [isUsageOpen, setIsUsageOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Carte pour la location de matériel */}
      <div className="border rounded-lg p-4">
        <button
          className="font-bold text-lg"
          onClick={() => setIsEquipmentOpen(!isEquipmentOpen)}
        >
          Location de matériel
        </button>
        {isEquipmentOpen && (
          <p className="mt-2">
            Louez l'équipement sportif dont vous avez besoin, où que vous soyez. 
            Parfait pour essayer de nouveaux sports sans investissement initial.
          </p>
        )}
      </div>

      {/* Carte pour l'usage */}
      <div className="border rounded-lg p-4">
        <button
          className="font-bold text-lg"
          onClick={() => setIsUsageOpen(!isUsageOpen)}
        >
          Usage
        </button>
        {isUsageOpen && (
          <p className="mt-2">
            Profitez de l'accès à des équipements de haute qualité maintenus par des professionnels. 
            Idéal pour les voyageurs et les sportifs occasionnels.
          </p>
        )}
      </div>
    </div>
  );
};

export default ExplanatoryBanner;