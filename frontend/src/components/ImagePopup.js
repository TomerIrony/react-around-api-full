function ImagePopup(props) {
  return (
    <div
      className={`popout ${
        Object.keys(props.data).length === 0 ? "" : `popout_opened`
      }`}
      id="imageOpened"
    >
      <div className="popout__images">
        <button
          type="button"
          className="popout__close-btn"
          id="popoutImageCloseButton"
          onClick={props.onClose}
        ></button>
        <img
          id="popoutImage"
          src={props.data.link}
          alt={props.data.name}
          className="popout__image"
        />
        <h2 id="popoutImageCaption" className="popout__caption">
          {props.data.name}
        </h2>
      </div>
    </div>
  );
}
export default ImagePopup;
