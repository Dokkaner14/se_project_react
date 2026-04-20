import "./Header.css";
import avatar from "../../assets/avatar.png";
import logo from "../../assets/smaller-logo.png";

function Header({ onAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      {/* Logo on the left */}
      <div className="header__left">
        <img src={logo} alt="WTWR app logo" className="smaller__logo" />
      </div>

      {/* Date in the center */}
      <div className="header__center">
        <p className="main__date-location">{currentDate}, Chicago</p>
      </div>

      {/* Add button + User info on the right */}
      <div className="header__right">
        <button className="header__add-clothes-btn" onClick={onAddClick}>
          {" "}
          + Add clothes
        </button>

        <div className="header__user-info">
          <p className="header__username">Terrence Tegegne</p>
          <img className="header__avatar" src={avatar} alt="User avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
