import "../ItemCard/ItemCard.css";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='320'%20height='240'%20viewBox='0%200%20320%20240'%3E%3Crect%20width='320'%20height='240'%20fill='%23e0e0e0'/%3E%3Ctext%20x='50%25'%20y='50%25'%20dominant-baseline='middle'%20text-anchor='middle'%20font-family='Arial,%20Helvetica,%20sans-serif'%20font-size='20'%20fill='%23666'%3ENo%20image%3C/text%3E%3C/svg%3E";

function ItemCard({ item, handleCardClick }) {
  const imageSrc = item.imageUrl || item.link || PLACEHOLDER_IMAGE;

  return (
    <li className="card">
      <p className="card__title">{item.name}</p>
      <img
        src={imageSrc}
        alt={item.name}
        onError={(e) => {
          e.currentTarget.src = PLACEHOLDER_IMAGE;
        }}
        onClick={() => {
          handleCardClick(item);
        }}
        className="card__image"
      />
    </li>
  );
}

export default ItemCard;
