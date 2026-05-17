import "./ItemModal.css";

function ItemModal({ card, onClose, onDelete }) {
  if (!card) return null;

  return (
    <div className="modal modal_is-opened" onClick={onClose}>
      <div
        className="modal__content modal__content_type_preview"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close-btn"
          onClick={onClose}
          aria-label="Close"
        />

        <img src={card.link} alt={card.name} className="modal__preview-image" />

        <div className="item-modal__footer">
          <div className="item-modal__text">
            <p className="modal__caption">{card.name}</p>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          <button
            type="button"
            className="item-modal__delete"
            onClick={() => onDelete(card)}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
