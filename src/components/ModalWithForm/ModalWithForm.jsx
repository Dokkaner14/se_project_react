import "../ModalWithForm/ModalWithForm.css";
import { useEffect } from "react";

function ModalWithForm({
  children,
  isOpen,
  onClose,
  title,
  buttonText,
  onSubmit,
}) {
  useEffect(() => {
    if (!isOpen) return;
    function handleEscape(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  function handleCloseClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      className={isOpen ? "modal" : "modal__hidden"}
      onClick={handleCloseClick}
    >
      <form name="form" className="modal__form" onSubmit={onSubmit}>
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close-btn"
          onClick={onClose}
        ></button>
        {children}
        <button type="submit" className="modal__submit-btn">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
