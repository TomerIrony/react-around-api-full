class Auth {
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

  register(password, email) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._checkResponse);
  }

  signin(password, email) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      }),
    }).then(this._checkResponse);
  }

  getUser(JWT) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JWT}`,
      },
    }).then(this._checkResponse);
  }
}

/* const auth = new Auth({
  baseUrl: 'https://api.tomer.students.nomoreparties.site',
}); */

const auth = new Auth({
  baseUrl: 'http://localhost:3000',
});

export default auth;
