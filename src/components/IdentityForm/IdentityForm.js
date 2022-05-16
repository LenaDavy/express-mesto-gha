import React from 'react';
import { Link } from 'react-router-dom';
import './IdentityForm.css'

function IdentityForm(props) {
  

  function onHoverBtn(evt) {
    evt.target.style.opacity = .85
  }
  
  function onHoverLink(evt) {
    evt.target.style.opacity = .6
  }
 
  function onLeave(evt) {
    evt.target.style.opacity = 1
  }

  return ( 
    <main className="identity">
      <form className="identity__form" noValidate name={`identity__form_type_${props.name}`} onSubmit={props.onSubmit}>
        <h3 className="identity__form-title">{props.title}</h3>
        {props.children}
        <button className="identity__button" type="submit" onMouseOver={onHoverBtn} onMouseLeave={onLeave}>{props.buttonText}</button>
      </form>
      <Link to="/sign-in" className={props.name === "sign-in" ? "identity__link" : "identity__link identity__link_type_visibled"} onMouseOver={onHoverLink} onMouseLeave={onLeave}>Уже зарегистрированы? Войти</Link>
    </main>
  )
}

export default IdentityForm