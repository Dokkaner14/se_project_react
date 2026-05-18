import "./SideBar.css";
import avatar from "../../assets/avatar.png";

export default function SideBar() {
  const username = "Terrence Tegegne";
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        {avatar ? (
          <img className="sidebar__avatar" src={avatar} alt="user avatar" />
        ) : (
          <span className="sidebar__avatar">
            {username?.toUpperCase().charAt(0) || ""}
          </span>
        )}

        <div className="sidebar__user-name">{username}</div>
      </div>
    </aside>
  );
}
