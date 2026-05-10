import "./ItemModal.css";
import { createPortal } from "react-dom";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({
  isOpen,
  card,
  onClose,
  onCloseClick,
  onDelete,
  onDeleteClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = card && currentUser && card.owner === currentUser._id;
  const closeModal = onClose || onCloseClick;
  const handleDelete = onDeleteClick || onDelete;

  useEffect(() => {
    if (!isOpen || !closeModal) return;

    function handleEscape(event) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeModal]);

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      closeModal?.();
    }
  }

  return createPortal(
    <div
      className={`modal${isOpen ? " modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content modal__content_type_image">
        <button className="modal__close" type="button" onClick={closeModal}>
          ✕
        </button>

        {card && (
          <>
            <img
              className="modal__image"
              src={card.imageUrl || card.link}
              alt={card.name}
            />

            <div className="modal__footer">
              <div className="modal__footer-info">
                <h2 className="modal__title">{card.name}</h2>
                <p className="modal__weather">Weather: {card.weather}</p>
              </div>
              {isOwner && (
                <button
                  className="modal__delete-button"
                  onClick={() => handleDelete?.(card)}
                >
                  Delete item
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default ItemModal;
