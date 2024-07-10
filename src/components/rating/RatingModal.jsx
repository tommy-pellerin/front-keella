import { useEffect, useRef } from 'react';
import "./ratingModal.css"

const RatingModal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  // Fermer le modal en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return isOpen ? (
    <div className="modal-backdrop">
      <div className="modal-content" ref={modalRef}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  ) : null;
};

export default RatingModal;