import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleClick = () => {
    if (onCardClick) onCardClick(item);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (!onCardLike) return;
    onCardLike(item).catch((err) => console.error(err));
  };

  const isLiked =
    currentUser && Array.isArray(item.likes)
      ? item.likes.some((id) => id === currentUser._id)
      : false;

  return (
    <li className="card" onClick={handleClick}>
      <p className="card__title">{item.name}</p>
      <img src={item.imageUrl} alt={item.name} className="card__image" />
      {currentUser && (
        <button
          type="button"
          className={`card__like-btn ${isLiked ? "card__like-btn_active" : ""}`}
          onClick={handleLike}
        >
          ❤️
        </button>
      )}
    </li>
  );
}

export default ItemCard;
