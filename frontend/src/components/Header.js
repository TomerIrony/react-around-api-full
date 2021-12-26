import siteLogo from '../images/logo.svg';
import line from '../images/Line42.svg';
import React from 'react';
import {
  LoggedContext,
  CurrentUserContext,
} from '../contexts/CurrentUserContext';

function Header(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const logged = React.useContext(LoggedContext);

  const [isClicked, setIsClicked] = React.useState(false);

  return (
    <header className="header">
      <div
        className={
          isClicked ? 'header__email header__display' : 'header__email'
        }
      >
        <span>{logged ? currentUser.email : null}</span>
      </div>
      {logged ? (
        <div
          className={
            isClicked
              ? 'header__mobile-logout header__display'
              : 'header__mobile-logout'
          }
        >
          <span
            onClick={() => {
              props.handleLogout();
            }}
          >
            Log out
          </span>
        </div>
      ) : null}
      {logged ? (
        <div
          className={
            isClicked ? 'header__border header__display' : 'header__border'
          }
        ></div>
      ) : null}

      <div className="header__wrapper">
        <img className="header__title" src={siteLogo} id="logo" alt="logo" />
        {logged ? (
          <div
            className="header__container"
            onClick={() => {
              setIsClicked(!isClicked);
            }}
          >
            <img src={line} alt="" className="header__mobile" />
            <img src={line} alt="" className="header__mobile" />
            <img src={line} alt="" className="header__mobile" />
          </div>
        ) : null}
      </div>
      {props.sign}
    </header>
  );
}

export default Header;
