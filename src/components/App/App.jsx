import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Profile from "../Profile/Profile.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import Footer from "../Footer/Footer.jsx";

import { coordinates, apiKey } from "../../utils/constants.js";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi.js";
import { getClothingItems, addItem, removeItem } from "../../utils/api.js";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "Unknown location",
    condition: "",
    isDay: false,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const modals = {
    add: "add-garment",
    preview: "preview-card",
    delete: "delete",
  };

  useEffect(() => {
    getWeatherData(coordinates, apiKey)
      .then((res) => setWeatherData(filterWeatherData(res)))
      .catch(console.error);

    getClothingItems().then(setClothingItems).catch(console.error);
  }, []);

  function handleToggleSwitch() {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  }

  function openModal(modalName) {
    setActiveModal(modalName);
  }

  function closeModal() {
    setActiveModal("");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    openModal(modals.preview);
  }

  function handleItemDeletion(itemId) {
    removeItem(itemId)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== itemId));
        closeModal();
      })
      .catch(console.error);
  }

  function handleAddSubmit(formData) {
    const itemData = {
      name: formData.name,
      imageUrl: formData.imageUrl,
      weather: formData.weather,
    };

    addItem(itemData)
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        closeModal();
      })
      .catch(console.error);
  }

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitch }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            weatherData={weatherData}
            openModal={() => openModal(modals.add)}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  clothingItems={clothingItems}
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  openModal={() => openModal(modals.add)}
                  handleCardClick={handleCardClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>

        <ItemModal
          isOpen={activeModal === modals.preview}
          card={selectedCard}
          onClose={closeModal}
          onDelete={handleItemDeletion}
        />

        <DeleteModal
          isOpen={activeModal === modals.delete}
          onClose={closeModal}
          onDelete={handleItemDeletion}
          card={selectedCard}
        />

        <AddItemModal
          isOpen={activeModal === modals.add}
          onCloseClick={closeModal}
          onAddItemModalSubmit={handleAddSubmit}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
