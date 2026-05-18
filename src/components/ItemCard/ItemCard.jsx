import "./ItemCard.css";

function ItemCard({ item, handleCardClick }) {
  // const handleCardClick = () => {
  //   handleCardClick(item);
  // };
  return (
    <li className="card">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={handleCardClick}
      />
      <p className="card__title">{item.name}</p>
    </li>
  );
}

export default ItemCard;
