import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  isOpen,
  onClose,
  isValid,
  onSubmit,
}) {
  if (!isOpen) return null;
  return (
    <div className="modal modal_is-opened" onClick={onClose}>
      <div
        className="modal__content modal__content_type_image"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button type="button" className="modal__close" onClick={onClose} />
        <h2 className="modal__title">{title} </h2>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="modal__submit"
            disabled={!isValid}
            style={{
              backgroundColor: isValid ? "#000" : "rgba(0, 0, 0, 0.3)",
              color: "#fff",
            }}
          >
            {" "}
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
