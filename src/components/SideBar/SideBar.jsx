import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  const username = currentUser?.name || "Guest";
  const avatarUrl = currentUser?.avatar || null;

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        {avatarUrl ? (
          <img className="sidebar__avatar" src={avatarUrl} alt="User avatar" />
        ) : (
          <span className="sidebar__avatar">
            {username?.toUpperCase().charAt(0) || "?"}
          </span>
        )}
        <p className="sidebar__username">{username}</p>
      </div>

      <div className="sidebar__actions">
        <button
          className="sidebar__edit-btn"
          onClick={onEditProfile}
          type="button"
        >
          Change profile data
        </button>

        <button
          className="sidebar__signout-btn"
          onClick={onSignOut}
          type="button"
        >
          Log out
        </button>
      </div>
    </aside>
  );
}
