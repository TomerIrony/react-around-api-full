import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlaceSubmit(
      inputRefName.current.value,
      inputRefLink.current.value
    );
  }

  const inputRefName = React.useRef();
  const inputRefLink = React.useRef();
  return (
    <PopupWithForm
      name="addCard"
      title="New Place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Save"
      onSubmit={handleSubmit}
    >
      <input
        className="form__text-input form__input"
        type="text"
        name="title"
        placeholder="title"
        id="cardNameInput"
        required
        minLength="2"
        ref={inputRefName}
      />
      <span className="form__validation cardNameInput-error"></span>
      <input
        className="form__text-input form__input"
        type="url"
        name="link"
        placeholder="Image URL"
        id="imageInput"
        required
        ref={inputRefLink}
      />
      <span className="form__validation imageInput-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
