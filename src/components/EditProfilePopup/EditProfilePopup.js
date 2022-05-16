import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [values, setValues] = React.useState({name: '', about: ''})

  React.useEffect(() => {
    setValues({name: currentUser.name, about: currentUser.about});
  }, [currentUser.name, currentUser.about, props.isOpen]);

  const handleChange = (event) => { 
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value}))
  };


  function handleSubmit(evt) {
    evt.preventDefault()
    props.onUpdateUser({name: values.name, about: values.about});
    setValues({name: values.name, about: values.about});
  };
  
    return (
      <PopupWithForm name ="profile" title ="Редактировать профиль" onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} isSending={props.isSending} buttonText={'Сохранить'}>
        <input value={values.name} onChange={handleChange} id="input-name" className="popup__input popup__input_type_name" required type="text" name="name" minLength="2" maxLength="40"/>
      <span className="popup__input-error input-name-error"/>z
      <input value={values.about} onChange={handleChange} id="input-activity" className="popup__input popup__input_type_activity" required type="text" name="about" minLength="2" maxLength="200"/>
      <span className="popup__input-error input-activity-error"/>
      </PopupWithForm>
    );
};

export default EditProfilePopup