import "../ClothesSection/ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, handleCardClick }) {
  return (
    <ul className="clothes-section__list">
      {clothingItems.map((item) => (
        <ItemCard
          item={item}
          handleCardClick={handleCardClick}
          key={item._id}
        />
      ))}
    </ul>
  );
}

export default ClothesSection;
