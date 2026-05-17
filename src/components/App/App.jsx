import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer.jsx";
import { getWeather } from "../../utils/weatherApi.js";
import ItemModal from "../ItemModal/ItemModal";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import Profile from "../Profile/Profile";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, addItem, deleteItem } from "../../utils/api";

const currentUser = {
  name: "Terrence Tegegne",
};

function App() {
  const [weather, setWeather] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  /*Tracks which modal is currently open ("preview" or "")*/
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFahrenheit, setIsFahrenheit] = useState(true);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  function handleOpenModal(modalName, card = null) {
    setActiveModal(modalName);
    setSelectedCard(card);
  } /* Opens the selected modal and stores the clicked card data */

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  function handleAddGarmentSubmit(newItem, reset) {
    addItem({
      name: newItem.name,
      weather: newItem.weather,
      imageUrl: newItem.imageUrl,
    })
      .then((item) => {
        setClothingItems((prevItems) => [item, ...prevItems]);
        handleCloseModal();
        reset();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard(null);
    /* Closes the modal and clears the selected card */
  } /*Closes any open modal by resetting activeModal*/

  useEffect(() => {
    if (!activeModal) return;
    /*Only run this effect if a modal is open*/

    function handleEscape(evt) {
      if (evt.key === "Escape") {
        handleCloseModal();
      }
    } /*Closes modal when Escape key is pressed*/

    document.addEventListener("keydown", handleEscape);
    /*Starts listening for Escape key*/

    return () => {
      document.removeEventListener("keydown", handleEscape);
    }; /*Cleans up event listener when modal closes*/
  }, [activeModal]);
  /*Runs whenever activeModal changes*/

  useEffect(() => {
    getWeather()
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => {
        console.error("Weather fetch failed:", err);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleDeleteItem(card) {
    deleteItem(card.id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => (item._id || item.id) !== card.id),
        );
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <BrowserRouter>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{
            currentTemperatureUnit,
            handleToggleSwitchChange,
          }}
        >
          <CurrentUserContext.Provider value={currentUser}>
            <div className="page__wrapper">
              <Header onAddClick={handleAddClick} city={weather?.city} />

              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weather={weather}
                      clothingItems={clothingItems}
                      onCardClick={handleOpenModal}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <Profile
                      weather={weather}
                      clothingItems={clothingItems}
                      onCardClick={handleOpenModal}
                      onAddClick={handleAddClick}
                    />
                  }
                />
              </Routes>

              <Footer />
            </div>
          </CurrentUserContext.Provider>
        </CurrentTemperatureUnitContext.Provider>
      </div>

      {/* ADD GARMENT MODAL */}
      <AddItemModal
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
        onSubmit={handleAddGarmentSubmit}
      />
      {/* PREVIEW MODAL */}
      {activeModal === "preview" && (
        <ItemModal
          card={selectedCard}
          onClose={handleCloseModal}
          onDelete={handleDeleteItem}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
