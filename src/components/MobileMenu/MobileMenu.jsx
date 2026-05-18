import "./MobileMenu.css";
import closeIcon from "../../assets/close.svg";
import avatar from "../../assets/avatar.png";

function MobileMenu({ onClose, handleAddClick }) {
  const handleAddClothesClick = () => {
    onClose();
    handleAddClick();
  };

  return (
    <div className="modal modal_opened">
      <div className="mobile-menu">
        <button onClick={onClose} type="button" className="mobile-menu__close">
          <img
            src={closeIcon}
            alt="Close"
            className="mobile-menu__close-icon"
          />
        </button>

        <div className="mobile-menu__profile">
          <p className="mobile-menu__username">Terrence Tegegne</p>
          <img
            src={avatar}
            alt="Terrence Tegegne"
            className="mobile-menu__avatar"
          />
        </div>

        <button
          onClick={handleAddClothesClick}
          type="button"
          className="mobile-menu__add-btn"
        >
          + Add clothes
        </button>
      </div>
    </div>
  );
}

export default MobileMenu;
