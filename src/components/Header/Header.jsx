import "./Header.css";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/smaller-logo.png";
import menuIcon from "../../assets/menu.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  handleMenuClick,
  weatherData,
  openLogin,
  openRegister,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);
  const username = currentUser?.name || "Guest";
  const avatarUrl = currentUser?.avatar || null;

  return (
    <header className="header">
      <NavLink className="header__logo-link" to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </NavLink>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city || "Loading..."}
      </p>

      <ToggleSwitch />

      {/* Add clothes button - only for logged in users */}
      {currentUser && (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
      )}

      {/* User avatar or Auth buttons */}
      {currentUser ? (
        <NavLink className="header__nav-link" to="/profile">
          <div className="header__user-container">
            <div className="header__user-name">{username}</div>
            {avatarUrl ? (
              <img
                className="header__avatar"
                src={avatarUrl}
                alt="user avatar"
              />
            ) : (
              <span className="header__avatar">
                {username?.toUpperCase().charAt(0) || ""}
              </span>
            )}
          </div>
        </NavLink>
      ) : (
        <div className="header__auth">
          <button className="header__auth-btn" onClick={openRegister}>
            Sign Up
          </button>
          <button className="header__auth-btn" onClick={openLogin}>
            Log In
          </button>
        </div>
      )}

      {/* Mobile Menu Button */}
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
