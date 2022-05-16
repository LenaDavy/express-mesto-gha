import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditAvatarPopup(props) {
  const avatar = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({avatar: avatar.current.value});
    avatar.current.value = ''
  };

  return (
    <PopupWithForm name ="avatar" title ="Обновить аватар" onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose} isSending={props.isSending} buttonText={'Сохранить'}>
      <input ref={avatar} id="input-avatar" className="popup__input popup__input_type_avatar" required type="url" name="avatar" placeholder="Ссылка на картинку"/>
      <span className="popup__input-error input-avatar-error"/>
    </PopupWithForm>
  );
};

export default EditAvatarPopup