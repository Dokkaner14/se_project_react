import "./ItemModal.css";

function ItemModal({ isOpen, card, onClose, onDeleteClick }) {
  if (!isOpen || !card) return null;

  return (
    <div className={`item-modal ${isOpen ? "item-modal_opened" : ""}`}>
      <div className="item-modal__content">
        <button className="item-modal__close" type="button" onClick={onClose}>
          ×
        </button>

        <img
          src={card.imageUrl}
          alt={card.name}
          className="item-modal__image"
        />

        <div className="item-modal__footer">
          <h2 className="item-modal__title">{card.name}</h2>
          <button
            type="button"
            className="item-modal__delete-btn"
            onClick={() => onDeleteClick(card)}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
