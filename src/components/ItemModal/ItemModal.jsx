import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, card, onClose, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = card && currentUser && card.owner === currentUser._id;

  if (!isOpen || !card) return null;

  return (
    <div className="modal modal_opened" onClick={onClose}>
      <div
        className="modal__content modal__content_type_image"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose}>
          ×
        </button>

        <img
          src={card.imageUrl || card.link}
          alt={card.name}
          className="modal__image"
        />

        <div className="modal__footer">
          <div className="modal__footer-info">
            <h2 className="modal__title">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          {isOwner && (
            <button
              className="modal__delete-button"
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
