import "../ClothesSection/ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ item, handleCardClick }) {
  return (
    <ItemCard item={item} handleCardClick={handleCardClick} key={item._id} />
  );
}

export default ClothesSection;
