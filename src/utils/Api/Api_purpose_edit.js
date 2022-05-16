import React from 'react';

class Api_purpose_edit extends React.Component { 
  constructor(props) { 
    super(props)
  };

  handleResponce = res => {if (res.ok) {return res.json()} return Promise.reject(`Error: ${res.status}`)};

  getInitialCards = () => { 
    return fetch(`${this.props.url}/cards`, { headers: this.props.headers }) 
    .then(this.handleResponce)
  }; 

  getUserInfo = () => { 
    return fetch(`${this.props.url}/users/me`, { headers: this.props.headers }) 
    .then(this.handleResponce)
  }; 

  changeUserAvatar = (avatarPopupValue) => { 
    return fetch(`${this.props.url}/users/me/avatar`, { 
      method: 'PATCH', 
      headers: this.props.headers, 
      body: JSON.stringify({ 
        avatar: avatarPopupValue.avatar, 
      }) 
    }) 
    .then(this.handleResponce) 
  }; 

  changeUserInfo = (profilePopupValues) => { 
    return fetch(`${this.props.url}/users/me`, { 
      method: 'PATCH', 
      headers: this.props.headers, 
      body: JSON.stringify({ 
        name: profilePopupValues.name, 
        about: profilePopupValues.about 
      }) 
    }) 
    .then(this.handleResponce) 
  }; 

  changeLikesStatus = (cardId, like) => { 
    return fetch(`${this.props.url}/cards/${cardId}/likes`, { 
      method: like ? 'PUT' : 'DELETE', 
      headers: this.props.headers }) 
    .then(this.handleResponce) 
  }; 

  createUserCard = (cardPopupValues) => { 
    return fetch(`${this.props.url}/cards`, { 
      method: 'POST', 
      headers: this.props.headers, 
      body: JSON.stringify({ 
        name: cardPopupValues.name, 
        link: cardPopupValues.link 
      }) 
    }) 
    .then(this.handleResponce) 
  }; 
 
  deleteUserCard = (id) => { 
    return fetch(`${this.props.url}/cards/${id}`, { 
      method: 'DELETE', 
      headers: this.props.headers, 
    }) 
    .then(this.handleResponce) 
  }; 
};

export const api_purpose_edit = new Api_purpose_edit({ 
  url: 'https://mesto.nomoreparties.co/v1/cohort-34', 
  headers: { 
    authorization: '290ee9b9-99bc-4bb1-9e25-3f37c57278f6', 
    'Content-Type': 'application/json' 
  } 
});
