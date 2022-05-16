import React from 'react';
import './ImagePopup.css';

function ImagePopup({name, card, onClose}) {
  
  return (
    <div className={`popup popup_type_${name}`}>
      <div className="popup_type_image__main">
        <button className="popup__close popup_type_image__close" type="button" onClick={onClose}/>
        <img className="popup_type_image__picture" src={card.link} alt={`изображение ${card.name}`}/>
        <h3 className="popup_type_image__city">{card.name}</h3>
      </div>
    </div>
  );
};

export default ImagePopup;