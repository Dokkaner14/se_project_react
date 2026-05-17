import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

function Profile({ clothingItems, openModal, handleCardClick }) {
  return (
    <section className="profile">
      <SideBar openModal={openModal} />

      <div className="profile__content">
        <div className="profile__header">
          <p className="profile__header-title">Your items</p>
          <button
            type="button"
            className="profile__add-btn"
            onClick={openModal}
          >
            + Add new
          </button>
        </div>

        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
        />
      </div>
    </section>
  );
}

export default Profile;
