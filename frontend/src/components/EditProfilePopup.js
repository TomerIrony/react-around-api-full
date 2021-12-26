import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
function EditProfilePopup(props) {
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.username);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(name, description);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Edit Profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Save"
      onSubmit={handleSubmit}
    >
      <input
        className="form__text-input form__input"
        type="text"
        name="Full Name"
        id="userInputfullName"
        placeholder="Full Name"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChangeName}
        value={name || ''}
      />
      <span className="form__validation userInputfullName-error"></span>

      <input
        className="form__text-input form__input"
        type="text"
        name="Description"
        id="userInputDescription"
        placeholder="Description"
        minLength="2"
        maxLength="200"
        required
        onChange={handleChangeDescription}
        value={description || ''}
      />
      <span className="form__validation userInputDescription-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
