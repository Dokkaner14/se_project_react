import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="avatar" />
      <p className="sidebar__name">{currentUser ? currentUser.name : ""}</p>
    </div>
  );
}

export default SideBar;
