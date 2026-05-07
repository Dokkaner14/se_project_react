import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card, openModal, onDelete }) {
  if (!isOpen || !card) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        <img
          src={card.imageUrl || card.link}
          alt={card.name}
          className="modal__image"
        />
        <h2 className="modal__title">{card.name}</h2>
        <p className="modal__weather">Weather: {card.weather}</p>
        <button
          className="modal__delete-btn"
          onClick={() => {
            onDelete(card._id);
          }}
        >
          Delete item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
