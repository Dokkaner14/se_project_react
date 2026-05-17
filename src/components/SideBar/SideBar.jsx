import "./SideBar.css";

function SideBar({ openModal }) {
  return (
    <div className="sidebar">
      <div className="sidebar__user">
        <img src="/avatar.png" alt="User avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Joel Quinones</p>
      </div>

      <button type="button" className="sidebar__add-btn" onClick={openModal}>
        + Add new
      </button>
    </div>
  );
}

export default SideBar;
