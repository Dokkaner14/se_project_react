import ItemCard from "../ItemCard/ItemCard.jsx";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, handleCardClick, onCardDelete }) {
  return (
    <section className="clothes-section">
      <h2 className="clothes-section__title">Your items</h2>
      <ul className="clothes-section__list">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            handleCardClick={handleCardClick}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
