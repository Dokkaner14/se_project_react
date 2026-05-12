import { Link } from "react-router-dom";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ openModal, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src="/smaller-logo.png" alt="WTWR LOGO" />
      </Link>
      <div className="header__center">
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
        <ToggleSwitch />
      </div>

      <div className="header__right">
        <button
          className="header__add-btn"
          onClick={() => {
            openModal("add-garment");
          }}
        >
          + Add new
        </button>
        <div className="header__avatar-section">
          <p className="header__avatar-name">Joel Quinones</p>
          <Link to="/profile">
            <img
              src="/avatar.png"
              alt="user avatar photo"
              className="header__avatar-pic"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
