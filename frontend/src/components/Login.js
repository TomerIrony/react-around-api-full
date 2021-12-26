import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

function Login(props) {
  const inputRefPassword = React.useRef();
  const inputRefEmail = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.handleLogin(
      inputRefPassword.current.value,
      inputRefEmail.current.value,
    );
    props.setUserData(inputRefEmail.current.value);
  }
  return (
    <>
      <Header
        sign={
          <Link className="header__signup" to="/signup">
            Sign up
          </Link>
        }
      />
      <form
        onSubmit={handleSubmit}
        action="/"
        name="Login"
        className="login__form"
      >
        <fieldset className="login__fieldset">
          <legend>
            <h2 className="login__heading">Log in</h2>
          </legend>
          <input
            className="login__text-input form__input"
            type="email"
            name="email"
            placeholder="Email"
            required
            minLength="2"
            ref={inputRefEmail}
          />
          <input
            className="login__text-input form__input"
            type="password"
            name="password"
            placeholder="Password"
            required
            ref={inputRefPassword}
          />
          <button type="submit" className="login__submit-btn form__submit">
            Log in
          </button>
          <Link className="login__sign" to="/signup">
            Not a member yet? Sign up here!
          </Link>
        </fieldset>
      </form>
    </>
  );
}

export default Login;
