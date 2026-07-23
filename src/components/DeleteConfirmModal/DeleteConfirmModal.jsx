import { useEffect } from "react";
import "../DeleteConfirmModal/DeleteConfirmModal.css";

function DeleteConfirmModal({ isOpen, onDelete, card, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleDelete = () => {
    onDelete(card?._id);
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal__content modal__content_type_delete">
        <button type="button" className="modal__close" onClick={onClose} />

        <p className="modal__delete-text">
          Are you sure you want to delete this item? <br /> action is
          irreversible.
        </p>

        <div className="modal__delete-buttons">
          <button
            type="button"
            className="modal__delete-btn"
            onClick={handleDelete}
          >
            Yes, delete item
          </button>
          <button type="button" className="modal__delete-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
