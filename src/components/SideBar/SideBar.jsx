import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const username = currentUser?.name || "Guest";
  const avatarUrl = currentUser?.avatar || null;

  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        {avatarUrl ? (
          <img className="sidebar__avatar" src={avatarUrl} alt="user avatar" />
        ) : (
          <span className="sidebar__avatar">
            {username?.toUpperCase().charAt(0) || ""}
          </span>
        )}

        <div className="sidebar__user-name">{username}</div>
      </div>
      <div className="sidebar__actions">
        {onEditProfile && (
          <button className="sidebar__edit-btn" onClick={onEditProfile}>
            Edit profile
          </button>
        )}
        {onSignOut && (
          <button className="sidebar__signout-btn" onClick={onSignOut}>
            Sign out
          </button>
        )}
      </div>
    </aside>
  );
}
