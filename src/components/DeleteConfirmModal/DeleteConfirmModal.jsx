import "./DeleteConfirmModal.css";

function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal modal_opened" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          ×
        </button>

        <h2 className="modal__title">Confirm Delete</h2>
        <p className="modal__text">
          Are you sure you want to delete this item?
        </p>

        <div className="modal__button-row">
          <button className="modal__delete-confirm" onClick={onConfirm}>
            Yes, delete
          </button>
          <button className="modal__cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
