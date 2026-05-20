import "./DeleteConfirmModal.css";

function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={`delete-modal ${isOpen ? "delete-modal_opened" : ""}`}>
      <div className="delete-modal__content">
        <button className="delete-modal__close" type="button" onClick={onClose}>
          ×
        </button>

        <p className="delete-modal__text">
          Are you sure you want to delete this item? 
          <br />  
          This action is irreversible.
        </p>

        <div className="delete-modal__buttons">
          <button
            type="button"
            className="delete-modal__confirm"
            onClick={onConfirm}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className="delete-modal__cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
