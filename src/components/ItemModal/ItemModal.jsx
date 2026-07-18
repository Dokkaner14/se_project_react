import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, card, onClose, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  if (!isOpen || !card) return null;

  const isOwner = currentUser && card.owner === currentUser._id;

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
          <div className="item-modal__info">
            <h2 className="item-modal__title">{card.name}</h2>
            <p className="item-modal__weather">Weather: {card.weather}</p>
          </div>
          {isOwner && (
            <button
              type="button"
              className="item-modal__delete-btn"
              onClick={() => onDeleteClick(card)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
