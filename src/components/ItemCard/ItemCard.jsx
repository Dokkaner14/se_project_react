import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import "./ItemCard.css";

function ItemCard({ item, handleCardClick, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = item.owner === currentUser?._id;

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onCardDelete(item);
  };

  return (
    <li className="card">
      <div className="card__header">
        <p className="card__title">{item.name}</p>

        {isOwn && (
          <button
            className="card__delete-btn"
            type="button"
            onClick={handleDeleteClick}
            aria-label="Delete item"
          />
        )}
      </div>

      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={() => handleCardClick(item)}
      />
    </li>
  );
}

export default ItemCard;
