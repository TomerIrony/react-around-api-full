class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getInitialCards(JWT) {
    return fetch(`${this._url}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
    }).then(this._checkResponse);
  }

  updateUserInfo(name, about, JWT) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  promiseAll() {
    return Promise.all([this.getInitialCards(), this.loadUserInfo()]);
  }

  addNewCard(title, link, JWT) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId, JWT) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
    }).then(this._checkResponse);
  }

  updateProfilePicture(inputURL, JWT) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
      body: JSON.stringify({
        avatar: inputURL,
      }),
    }).then(this._checkResponse);
  }

  likeCard(cardId, JWT) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
    }).then(this._checkResponse);
  }

  removeLike(cardId, JWT) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked, JWT) {
    if (isLiked) {
      return this.likeCard(cardId, JWT);
    } else {
      return this.removeLike(cardId, JWT);
    }
  }
}

/* const api = new Api({
  baseUrl: 'https://api.tomer.students.nomoreparties.site',
}); */

const api = new Api({
  baseUrl: 'http://localhost:3000',
});
export default api;
