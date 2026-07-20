import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleClick = () => onCardClick && onCardClick(item);

  const handleLike = (e) => {
    e.stopPropagation();
    onCardLike && onCardLike(item);
  };

  const isLiked =
    currentUser && Array.isArray(item.likes)
      ? item.likes.some((id) => id === currentUser._id)
      : false;

  return (
    <li className="card" onClick={handleClick}>
      <img
        src={item.imageUrl || item.link}
        alt={item.name}
        className="card__image"
        onError={(e) =>
          (e.target.src = "https://via.placeholder.com/325x280?text=No+Image")
        }
      />
      <div className="card__header">
        <p className="card__title">{item.name}</p>
        {currentUser && (
          <button
            className={`card__like-btn ${isLiked ? "card__like-btn_active" : ""}`}
            onClick={handleLike}
          >
            {isLiked ? "❤️" : "♡"}
          </button>
        )}
      </div>
    </li>
  );
}

export default ItemCard;
