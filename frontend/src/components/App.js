import React, { useState } from 'react';
import Header from './Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import {
  CurrentUserContext,
  CardsContext,
  LoggedContext,
  RegisterContext,
} from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Signup from './Signup';
import auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [registerSuccess, setRegisterSuccess] = React.useState();
  const [userEmail, setUserEmail] = useState('');

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [imagePen, setImagePen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [isToolOpen, setIsToolOpen] = React.useState();

  const [cards, setCards] = React.useState([]);
  const [jwt, setJwt] = useState();

  React.useEffect(() => {
    getUserData();
  }, []);

  React.useEffect(() => {
    if (jwt) {
      api
        .getInitialCards(jwt)
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [jwt]);

  function handleAddPlaceSubmit(name, link) {
    api
      .addNewCard(name, link, jwt)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    const deleteId = card._id;
    const newCardArr = [];
    api
      .deleteCard(card._id, jwt)
      .then(() => {
        cards.filter((card) => {
          if (!(card._id === deleteId)) {
            newCardArr.push(card);
          }
        });
      })
      .then(() => {
        setCards(newCardArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMouseEnter() {
    setImagePen(true);
  }

  function handleMouseLeave() {
    setImagePen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsToolOpen(false);
  }

  function handleUpdateUser(name, about) {
    api
      .updateUserInfo(name, about, jwt)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .updateProfilePicture(avatar, jwt)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked, jwt)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        if (res) {
          setRegisterSuccess(true);
        }
      })
      .catch((err) => {
        setRegisterSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setIsToolOpen(true);
      });
  }

  function handleLogin(password, email) {
    auth
      .signin(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
        }
        setLoggedIn(true);
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  function getUserData() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      setJwt(jwt);

      auth
        .getUser(jwt)
        .then((res) => {
          setCurrentUser(res);
          if (res) {
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="App">
      <RegisterContext.Provider value={registerSuccess}>
        <LoggedContext.Provider value={loggedIn}>
          <CardsContext.Provider value={cards}>
            <CurrentUserContext.Provider value={currentUser}>
              <div className="root__content">
                {loggedIn ? (
                  <Header userEmail={userEmail} handleLogout={handleLogout} />
                ) : null}
                <Routes>
                  <Route
                    path="/"
                    element={<ProtectedRoute path="/" loggedIn={loggedIn} />}
                  >
                    <Route
                      path="/"
                      element={
                        <Main
                          onEditAvatarClick={handleEditAvatarClick}
                          onAddPlaceClick={handleAddPlaceClick}
                          onEditProfileClick={handleEditProfileClick}
                          getCardData={handleCardClick}
                          onProfileOver={handleMouseEnter}
                          onProfileLeave={handleMouseLeave}
                          isOpen={imagePen}
                          cards={cards}
                          setCards={setCards}
                          onCardLike={handleCardLike}
                          onCardDelete={handleCardDelete}
                        />
                      }
                    />
                  </Route>
                  <Route
                    path="/signup"
                    element={
                      loggedIn ? (
                        <Navigate to="/" />
                      ) : (
                        <Signup handleRegister={handleRegister} />
                      )
                    }
                  ></Route>
                  <Route
                    path="/signin"
                    element={
                      loggedIn ? (
                        <Navigate to="/" />
                      ) : (
                        <Login
                          handleLogin={handleLogin}
                          setUserData={setUserEmail}
                        />
                      )
                    }
                  ></Route>
                  <Route
                    path="/"
                    element={
                      loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
                    }
                  ></Route>
                </Routes>
                <Footer />
                <InfoTooltip onClose={closeAllPopups} isOpen={isToolOpen} />
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                />
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                />
                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlaceSubmit={handleAddPlaceSubmit}
                />

                <PopupWithForm
                  name="deleteCard"
                  title="Are you sure?"
                  onClose={closeAllPopups}
                  buttonText="Yes"
                />

                <ImagePopup data={selectedCard} onClose={closeAllPopups} />
              </div>
            </CurrentUserContext.Provider>
          </CardsContext.Provider>
        </LoggedContext.Provider>
      </RegisterContext.Provider>
    </div>
  );
}

export default App;
