import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import "./SideBar.css";

function SideBar({ openModal }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img
          src={currentUser?.avatar || "/avatar.png"}
          alt="User avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">
          {currentUser?.name || "Joel Quinones"}
        </p>
      </div>

      <button type="button" className="sidebar__add-btn" onClick={openModal}>
        + Add new
      </button>
    </div>
  );
}

export default SideBar;
