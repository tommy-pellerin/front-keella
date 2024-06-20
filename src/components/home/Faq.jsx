import React, { useState } from 'react';

const Faq = () => {
  const [open, setOpen] = useState(null);

  const toggle = index => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };

  return (
    <div className='w-full px-4'>
      <div className='mx-auto w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center mb-8'>FAQs</h2>
        {[
          {
            title: 'Concept',
            content: 'Keella est une plateforme innovante qui permet aux utilisateurs de trouver et de réserver des espaces sportifs privés ou des séances d\'entraînement organisées par des particuliers, tout comme Airbnb permet de trouver des logements temporaires. Cette approche démocratise l\'accès aux installations sportives et favorise une communauté active et engagée.'
          },
          {
            title: 'Utilisation',
            content: 'La plateforme fonctionne sur un système de paiement par crédits, où les utilisateurs achètent des crédits qu\'ils peuvent ensuite utiliser pour réserver des activités sportives. Après avoir choisi une séance, ils attendent la confirmation de la réservation et la validation par l\'hôte. Les utilisateurs peuvent également créer leurs propres séances de workout, invitant d\'autres à se joindre à eux.'
          },
          {
            title: 'Retour expérience',
            content: 'Après avoir participé à une activité, les utilisateurs sont encouragés à laisser des commentaires et à noter leur expérience. Cela aide non seulement les autres utilisateurs à faire des choix éclairés, mais contribue également à maintenir un niveau de qualité élevé sur la plateforme. Les retours d\'expérience sont essentiels pour bâtir une communauté de confiance.'
          }
        ].map((faq, index) => (
          <div key={index} className='mb-2'>
            <button
              className='flex justify-between items-center p-4 w-full font-medium text-left text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200'
              onClick={() => toggle(index)}
            >
              {faq.title}
              <span>{open === index ? '-' : '+'}</span>
            </button>
            <div className={`${open === index ? 'block' : 'hidden'} p-4 bg-white rounded-lg`}>
              <p>{faq.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;