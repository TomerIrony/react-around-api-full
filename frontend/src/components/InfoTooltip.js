import React from 'react';
import union from '../images/Union.jpg';
import error from '../images/error.jpg';

import { RegisterContext } from '../contexts/CurrentUserContext';

function InfoTooltip(props) {
  const register = React.useContext(RegisterContext);

  return (
    <div className={`popout ${props.isOpen ? `popout_opened` : ''}`}>
      <div className="popout__container">
        <button
          type="button"
          aria-label="close"
          className="popout__close-btn"
          id="closeProfileButton"
          onClick={props.onClose}
        ></button>
        <form>
          <fieldset className="form__fieldset">
            <legend className="form__image">
              {register ? (
                <img
                  className="form__image"
                  alt="approved register"
                  src={union}
                />
              ) : (
                <img
                  className="form__image"
                  alt="failed register"
                  src={error}
                />
              )}
            </legend>
            <legend>
              <h2 className="form__heading popout__title">
                {register
                  ? 'Success! You have now been registered.'
                  : 'Oops, something went wrong! Please try again.'}
              </h2>
            </legend>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default InfoTooltip;
