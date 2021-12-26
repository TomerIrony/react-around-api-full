function PopupWithForm(props) {
  return (
    <div
      className={`popout ${props.isOpen ? `popout_opened` : ''}`}
      id={props.name}
    >
      <div className="popout__container">
        <button
          type="button"
          aria-label="close"
          className="popout__close-btn"
          id="closeProfileButton"
          onClick={props.onClose} //props.onClose
        ></button>
        <form
          onSubmit={props.onSubmit}
          action="/"
          name={props.name}
          className="form"
          id={`${props.name}Form`}
        >
          <fieldset className="form__fieldset">
            <legend>
              <h2 className="form__heading">{props.title}</h2>
            </legend>
            {props.children}

            <button
              type="submit"
              className="form__submit-btn form__submit"
              /*               id="saveInputProfileButton" */
            >
              {props.buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
