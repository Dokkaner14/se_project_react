import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleClick = () => {
    console.log("card clicked:", item);
    onCardClick(item);
  };

  return (
    <li className="card" onClick={handleClick}>
      <p className="card__title">{item.name}</p>
      <img src={item.imageUrl} alt={item.name} className="card__image" />
    </li>
  );
}

export default ItemCard;
