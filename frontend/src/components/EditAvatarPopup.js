import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(inputRef.current.value);
  }

  const inputRef = React.useRef();

  return (
    <PopupWithForm
      name="editImage"
      title="Change profile picture"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Save"
      onSubmit={handleSubmit}
    >
      <input
        className="form__text-input form__input"
        type="url"
        ref={inputRef}
        name="Profile Image Url"
        placeholder="Image URL"
        id="profileImageInput"
        required
      />
      <span className="form__validation profileImageInput-error"></span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
