import "./ModalWithForm.css";
import { useEffect } from "react";

function ModalWithForm({
  title,
  children,
  buttonText,
  secondaryButtonText,
  onSecondaryClick,
  isOpen,
  onClose,
  onSubmit,
}) {
  // Close modal with Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal modal_opened" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" type="button" onClick={onClose}>
          ×
        </button>

        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          <div className="modal__button-row">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>

            {secondaryButtonText && onSecondaryClick && (
              <button
                type="button"
                className="modal__secondary"
                onClick={onSecondaryClick}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
