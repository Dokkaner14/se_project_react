import "./Header.css";
import avatar from "../../assets/avatar.png";
import logo from "../../assets/smaller-logo.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Header({ onAddClick, city }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src={logo} alt="WTWR app logo" className="smaller__logo" />
        </Link>
        <div className="main__left">
          <p className="main__date-location">
            {currentDate}
            {city ? `, ${city}` : ""}
          </p>
        </div>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        <button className="header__add-clothes-btn" onClick={onAddClick}>
          + Add clothes
        </button>

        <Link to="/profile" className="header__user-info">
          <p className="header__username">
            {currentUser ? currentUser.name : ""}
          </p>
          <img className="header__avatar" src={avatar} alt="User avatar" />
        </Link>
      </div>
    </header>
  );
}
export default Header;
