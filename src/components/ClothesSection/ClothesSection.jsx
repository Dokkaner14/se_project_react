import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  title,
  showAddButton = false,
  showOnlyByUser = false,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const itemsToShow =
    showOnlyByUser && currentUser
      ? clothingItems.filter((item) => item.owner === currentUser._id)
      : clothingItems;

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <section className="clothes-section__text">{title}</section>

        {showAddButton && (
          <button className="clothes-section__btn" onClick={handleAddClick}>
            + Add new
          </button>
        )}
      </div>

      <ul className="clothes-section__items">
        {itemsToShow.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={handleCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}
