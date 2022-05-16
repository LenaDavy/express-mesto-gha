import React from 'react';
import './Main.css';
import Card from '../Card/Card';
import profileAvatarPencil from '../../images/profile__avatar-pencil.svg';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="main">
      <section className="profile">
        <button className="profile__user-avatar" type="button" onClick={props.onEditAvatar}>
          <img className="profile__photo" src={currentUser.avatar} alt="аватар пользователя"/>
          <img className="profile__avatar-edit" src={profileAvatarPencil} alt="значок редактирования аватара"/>
        </button>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}/>
          <p className="profile__text">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}/>
      </section>
      <ul className="cards">
        {props.cards.map(card => <Card key={card._id} cardDeleteClick={() => props.onCardDelete(card)} cardLikeClick={() => props.onCardLike(card)} cardImgClick={() => props.onCardImgClick(card)} {...card }/>)}
      </ul>
    </main>
  );
};

export default Main;