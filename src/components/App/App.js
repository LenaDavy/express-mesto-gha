import React from 'react';
import './App.css';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { api_purpose_edit } from '../../utils/Api/Api_purpose_edit';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import ImagePopup from '../ImagePopup/ImagePopup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {api_purpose_login} from '../../utils/Api/Api_purpose_login'
import InfoTooltip from '../InfoTooltip/InfoTooltip'

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [email, setEmail] = React.useState('email')
  const [currentUserData, setСurrentUserData] = React.useState({ name: '', about: '', avatar: ''});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [values, setValues] = React.useState({email: '', password: ''})
  const [isOpenTooltip, setIsOpenTooltip] = React.useState(false);
  const [tooltipName, setTooltipName]  = React.useState('');
  const history = useHistory()
  

  React.useEffect(() => {
    api_purpose_edit.getUserInfo()
    .then(res => {setСurrentUserData(res)})
    .catch(err => console.log(`Ошибка получения данных пользователя: ${err}`)) 

    let token = localStorage.getItem('token');
    if(token){ api_purpose_login.identity(token)
      .then((res) => {setEmail(res.data.email)})
      .catch(err => {console.log(`Ошибка авторизации пользователя: ${err}`); setLoggedIn(false)})
    }

    if(loggedIn) {api_purpose_edit.getInitialCards()
      .then(data => {setCards(data)})
      .catch(err => console.log(`Ошибка загрузки карточек: ${err}`))
    }
  }, [loggedIn]);

  
  const handleChangeInputFormSignUp = (event) => { 
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value}))
  }
        
  function handleSubmitFormSignUp(evt) {
    evt.preventDefault()
    api_purpose_login.signUp(values.email, values.password)
    .then((res) => {
      if(res) {setTooltipName('success'); setIsOpenTooltip(true); history.push('/sign-in')} 
      else {setTooltipName('fail'); setIsOpenTooltip(true)}
    })
    .catch(err => {setTooltipName('fail'); console.log(`Ошибка регистрации пользователя: ${err}`)})
  };
 
  const handleChangeInputFormLogIn = (event) => { 
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value}))
  }
  
  function handleSubmitFormLogIn(evt) {
    evt.preventDefault()
    api_purpose_login.signIn(values.email, values.password)
    .then(res => {
      if(res) {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        history.push('/')
      } else {setTooltipName('fail'); setIsOpenTooltip(true)}
    })
    .catch((err) => {setTooltipName('fail'); console.log(`Ошибка авторизации пользователя: ${err}`)})
  }

  function handleEditProfileClick() {setIsEditProfilePopupOpen(true)};
  function handleEditAvatarClick() {setIsEditAvatarPopupOpen(true)};
  function handleAddPlaceClick() {setIsAddPlacePopupOpen(true)};
  function handleCardImgClick(card) {setSelectedCard({name: card.name, link: card.link})};
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsOpenTooltip(false)
    setSelectedCard(null)
  };


  function handleCardLikeClick(card) {
    const isLiked = card.likes.some(i => i._id === currentUserData._id);
    api_purpose_edit.changeLikesStatus(card._id, !isLiked)
    .then((newCard) => {setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c))})
    .catch(err => console.log(`Ошибка изменения состояния лайка: ${err}`))
  };

  function handleCardDeleteClick(card) {
    api_purpose_edit.deleteUserCard(card._id)
    .then(() => {setCards(cards => cards.filter(c => {return c._id !== card._id}))})
    .catch(err => console.log(`Ошибка удаления карточки: ${err}`))
  };

  function handleUpdateUser(data) {
    setIsSending(true)
    api_purpose_edit.changeUserInfo(data)
    .then(res => {setСurrentUserData(res); closeAllPopups(); setIsSending(false)})
    .catch(err => console.log(`Ошибка изменения данных пользователя: ${err}`))
  };

  function handleUpdateAvatar(data) {
    setIsSending(true)
    api_purpose_edit.changeUserAvatar(data)
    .then(res => {setСurrentUserData(res); closeAllPopups(); setIsSending(false)})
    .catch(err => console.log(`Ошибка изменения аватара пользователя: ${err}`))
  };

  function handleAddPlaceSubmit(data) {
    setIsSending(true)
    api_purpose_edit.createUserCard(data)
    .then(res => {setCards([res, ...cards]); closeAllPopups(); setIsSending(false)})
    .catch(err => console.log(`Ошибка добавления карточки пользователя: ${err}`))
  };

  return (
    <CurrentUserContext.Provider value={currentUserData}>
      <div className="app">
        <Header email={email}/>
        <Switch>
          <ProtectedRoute exact path="/" component={Main} isLogged={loggedIn} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardImgClick={handleCardImgClick} cards={cards} onCardLike={handleCardLikeClick} onCardDelete={handleCardDeleteClick}/>
          <Route path="/sign-up">
            <Register values={values} onSubmit={handleSubmitFormSignUp} onChange={handleChangeInputFormSignUp}/>
          </Route>
          <Route path="/sign-in">
            <Login values={values} onSubmit={handleSubmitFormLogIn} onChange={handleChangeInputFormLogIn}/>
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <Footer/>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isSending={isSending}/> 
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isSending={isSending}/>
        <AddPlacePopup  isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isSending={isSending}/>
        {selectedCard && <ImagePopup name = "image" card={selectedCard} onClose={closeAllPopups}/>}
        <InfoTooltip name={tooltipName} isOpen={isOpenTooltip} onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;