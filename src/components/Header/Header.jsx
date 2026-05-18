import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../assets/smaller-logo.png";
import avatar from "../../assets/avatar.png";
import menuIcon from "../../assets/menu.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, handleMenuClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const username = "Terrence Tegegne";

  return (
    <header className="header">
      <NavLink className="header__logo-link" to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>

      <NavLink className="header__nav-link" to="/profile">
        <div className="header__user-container">
          <div className="header__user-name">{username}</div>

          {avatar ? (
            <img className="header__avatar" src={avatar} alt="user avatar" />
          ) : (
            <span className="header__avatar">
              {username?.toUpperCase().charAt(0) || ""}
            </span>
          )}
        </div>
      </NavLink>

      <button
        onClick={handleMenuClick}
        type="button"
        className="header__menu-btn"
      >
        <img src={menuIcon} alt="Open menu" className="header__menu-icon" />
      </button>
    </header>
  );
}

export default Header;
