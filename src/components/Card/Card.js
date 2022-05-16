import React from 'react';
import './Card.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`card__delete-button ${!isOwn && 'card__delete-button_hidden'}`);

  const isLiked = props.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`card__like-button ${isLiked && 'card__like-button_active'}`);
  
  function handleImgClick() {
    props.cardImgClick(props.card);
  };

  function handleLikeClick() {
    props.cardLikeClick(props.card);
  };
  
  function handleDeleteClick() {
    props.cardDeleteClick(props.card);
  };

  return (
    <li className="card">
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}/>
      <img className="card__img" src={props.link} alt={`изображение ${props.name}`} onClick={handleImgClick}/>
      <div className="card__description">
        <h2 className="card__city">{props.name}</h2>
        <div className="card__like-area">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}/>
          <p className="card__likes-counter">{props.likes.length}</p>
        </div>
      </div>
    </li>
  );
};

export default Card;