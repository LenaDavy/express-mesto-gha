import React from 'react';


class Api_purpose_login extends React.Component { 
  constructor(props) { 
    super(props)
  };

  handleResponce = response => {try {if (response.status === 200){return response.json()}} catch(e){return (e)}}
    
  signUp = (email, password) => {
    return fetch(`${this.props.url}/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({password: password, email: email})
    })
    .then(this.handleResponce)
  }

    signIn = (email, password) => {
      return fetch(`${this.props.url}/signin`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({password: password, email: email})
      })
      .then(this.handleResponce)
    }

    identity = (JWT) => {
      return fetch(`${this.props.url}/users/me`,
        {headers: {'Content-Type': 'application/json', "Authorization" : `Bearer ${JWT}`}
      })
      .then(this.handleResponce)
      .then((res) => {return res})
      .catch((err) => console.log(err));
    }
};

export const api_purpose_login = new Api_purpose_login({ 
    url: 'https://auth.nomoreparties.co'
})