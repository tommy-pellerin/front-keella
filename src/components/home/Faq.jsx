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
        {['Concept', 'Utilisation', 'Avantages'].map((item, index) => (
          <div key={index} className='mb-2'>
            <button
              className='flex justify-between items-center p-4 w-full font-medium text-left text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200'
              onClick={() => toggle(index)}
            >
              {item}
              <span>{open === index ? '-' : '+'}</span>
            </button>
            <div className={`${open === index ? 'block' : 'hidden'} p-4 bg-white rounded-lg`}>
              <p>
                {/* Remplacez ce texte par les explications détaillées de chaque section. */}
                Explication détaillée de {item}.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;