import React from 'react';
import './InfoTooltip.css';
import imgTooltipSuccess from '../../images/tooltip_success.svg'
import imgTooltipFail from '../../images/tooltip_fail.svg'

function InfoTooltip(props) {

  return (
    <div className={props.isOpen ? 'tooltip tooltip_open' : "tooltip"}>
      <div className="tooltip__main">
        <button className="tooltip__close" type="button" onClick={props.onClose}/>
        <img className="tooltip__img" src={props.name == 'fail' ? imgTooltipFail : imgTooltipSuccess}/>
        <p className="tooltip__text">{props.name == 'fail' ? "Что-то пошло не так! Попробуйте ещё раз." : "Вы успешно зарегистрировались!"}</p>
      </div>
    </div>
  );
};

export default InfoTooltip;