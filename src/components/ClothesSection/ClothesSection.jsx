import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
  title = "Clothing items",
  showAddButton = false,
  showOnlyByUser = false,
}) {
  const currentUser = useContext(CurrentUserContext);

  // Filter logic for Profile page (showOnlyByUser = true)
  const itemsToShow =
    showOnlyByUser && currentUser
      ? clothingItems.filter((item) => item.owner === currentUser._id)
      : showOnlyByUser && !currentUser
        ? []
        : clothingItems;

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">{title}</h2>

        {showAddButton && currentUser && (
          <button
            className="clothes-section__add-btn"
            onClick={handleAddClick}
            type="button"
          >
            + Add new
          </button>
        )}
      </div>

      <ul className="clothes-section__items">
        {itemsToShow.length > 0 ? (
          itemsToShow.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          ))
        ) : (
          <p className="clothes-section__empty">No items found</p>
        )}
      </ul>
    </div>
  );
}
