import { useEffect } from "react";
import "../DeleteModal/DeleteModal.css";

function DeleteModal({ isOpen, onDelete, card, onClose }) {
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

  function handleDelete() {
    onDelete(card._id);
  }

  return (
    <div className={isOpen ? "modal" : "modal__delete-hidden"}>
      <div className="modal__delete-content">
        <button
          type="button"
          className="modal__close-btn_type_delete"
          onClick={handleCloseClick}
        ></button>
        <p className="modal__delete-text">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>
        <div className="modal__delete-buttons">
          <button
            type="button"
            className="modal__delete-btn_type_delete"
            onClick={handleDelete}
          >
            Yes, delete this item
          </button>
          <button className="modal__cancel-btn" onClick={handleCloseClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
