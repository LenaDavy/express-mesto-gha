import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function AddPlacePopup(props) {
  const [values, setValues] = React.useState({name: '', link: ''})

  const handleChange = (event) => { 
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value})) 
  };
 
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({name: values.name, link: values.link});
    setValues({name: '', link: ''})
    };
  
  return (
    <PopupWithForm name ="card" title ="Новое место" onSubmit={handleSubmit} isOpen={ props.isOpen} onClose={props.onClose} isSending={props.isSending} buttonText={'Сохранить'}>
      <input value={values.name} onChange={handleChange} id="input-title" className="popup__input popup__input_type_title" required type="text" name="name" placeholder="Название" minLength="2" maxLength="30"/>
      <span className="popup__input-error input-title-error"/>
      <input value={values.link} onChange={handleChange} id="input-attribute" className="popup__input popup__input_type_attribute" required type="url" name="link" placeholder="Ссылка на картинку"/>
      <span className="popup__input-error input-attribute-error"/>
    </PopupWithForm>
  );
};
    
export default AddPlacePopup;