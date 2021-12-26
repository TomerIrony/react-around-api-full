import React from 'react';
import editProfilePen from '../images/pen.svg';
import plusSign from '../images/plussign.svg';
import Card from './Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <div
            onMouseEnter={props.onProfileOver}
            onMouseLeave={props.onProfileLeave}
            className="profile__image-container"
          >
            <img
              className="profile__image"
              src={currentUser.avatar}
              alt="profile img"
            />
            <img
              src={editProfilePen}
              alt="editImagePen"
              className={`profile__image-pen ${
                props.isOpen ? `profile__image-pen-show` : ''
              }`}
              id="pen"
              onClick={props.onEditAvatarClick}
            />
          </div>
          <div className="profile__text">
            <div className="profile__title">
              <h1 className="profile__username" id="fullName">
                {currentUser.username}
              </h1>
              <button
                type="button"
                id="openProfile"
                className="profile__edit"
                onClick={props.onEditProfileClick}
              >
                <img
                  className="profile__pen"
                  src={editProfilePen}
                  id="profilePen"
                  alt="pen"
                />
              </button>
            </div>
            <p className="profile__subtitle" id="description">
              {currentUser.about}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="profile__button"
          id="addNewContentButton"
          onClick={props.onAddPlaceClick}
        >
          <img
            className="profile__plus"
            src={plusSign}
            id="plusSign"
            alt="plus sign"
          />
        </button>
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            fetchData={props.getCardData}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
