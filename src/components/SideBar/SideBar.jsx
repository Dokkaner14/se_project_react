import "../SideBar/SideBar.css";
import AvatarPic from "../../assets/avatar.png";

function SideBar() {
  return (
    <aside className="sideBar">
      <div className="sideBar__header">
        <img
          src={AvatarPic}
          alt="User profile picture"
          className="sideBar__avatar"
        />
        <p className="sideBar__avatar-name">Terrence Tegegne</p>
      </div>
    </aside>
  );
}

export default SideBar;
