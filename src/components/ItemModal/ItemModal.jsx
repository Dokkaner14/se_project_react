import "./ItemModal.css";

function ItemModal({ isOpen, card, onClose }) {
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

        <h2 className="item-modal__title">{card.name}</h2>
      </div>
    </div>
  );
}

export default ItemModal;
