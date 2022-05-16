import React from 'react';
import './PopupWithForm.css';

function PopupWithForm(props) {

  return (
    <div className={props.isOpen ? `popup popup_type_${props.name}` : "popup"}>  
      <div className="popup__main">
        <button className="popup__close" type="button" onClick={props.onClose}/>
        <h3 className="popup__form-title">{props.title}</h3>
        <form className="popup__form" noValidate name={`popup__form_type_${props.name}`} onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__button" type="submit">{props.isSending ? 'Сохранение...' : props.buttonText}</button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;