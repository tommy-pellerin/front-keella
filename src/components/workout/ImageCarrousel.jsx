import { useState, useEffect } from "react";

const ImageCarrousel = ({images}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };
  return(
    <div id="default-carousel" className={`relative duration-700 ease-in-out`}>
      {images.map((image, index) => (
        <div key={index} className={`overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96 ${index === currentImageIndex ? '' : 'hidden'}`}>
          <div className="duration-700 ease-in-out">
            <span className="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800">
              Slide {index + 1}
            </span>
            <div className="flex items-center justify-center overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
              <img src={image} className="w-full h-full object-contain" alt={`Slide ${index + 1}`} />
            </div>
          </div>
        </div>
      ))}
      <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
        {images.map((_, index) => (
          <button key={index} type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label={`Slide ${index + 1}`} onClick={() => setCurrentImageIndex(index)}></button>
        ))}
      </div>
      <button type="button" className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" onClick={prevImage}>
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              <span className="hidden">Previous</span>
          </span>
      </button>
      <button type="button" className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" onClick={nextImage}>
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              <span className="hidden">Next</span>
          </span>
      </button>
    </div>
  )
  
}

export default ImageCarrousel