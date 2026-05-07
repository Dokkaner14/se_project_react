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
  //state

  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "Unkown location",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  useEffect(() => {
    getWeatherData(coordinates, apiKey)
      .then((weatherResponse) => {
        const filteredWeatherData = filterWeatherData(weatherResponse);
        setWeatherData(filteredWeatherData);
      })
      .catch(console.error);

    getClothingItems()
      .then((clothingItemsData) => {
        setClothingItems(clothingItemsData);
      })
      .catch(console.error);
  }, []);

  //container for all modal conditions to open
  const modals = {
    add: "add-garment",
    preview: "preview-card",
    delete: "delete",
  };

  function handleToggleSwitch() {
    setCurrentTemperatureUnit(() => {
      return currentTemperatureUnit === "F" ? "C" : "F";
    });
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
        const filteredList = clothingItems.filter((item) => {
          return item._id !== itemId;
        });
        setClothingItems(filteredList);
        closeModal();
      })
      .catch(console.error);
    //pass handler to itemModal
  }

  function handleAddSubmit(formData) {
    const itemData = {
      name: formData.name,
      imageUrl: formData.imageUrl,
      weather: formData.weather,
    };

    addItem(itemData)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
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
            openModal={() => {
              openModal(modals.add);
            }}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  clothingItems={clothingItems}
                  weatherData={weatherData}
                  onClose={closeModal}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  openModal={() => {
                    openModal(modals.add);
                  }}
                  handleCardClick={handleCardClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>

        <ItemModal
          onClose={closeModal}
          isOpen={activeModal === modals.preview}
          card={selectedCard}
          openModal={() => {
            openModal(modals.delete);
          }}
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
          title="New garment"
          buttonText="Add garment"
          onClose={closeModal}
          onAddItem={handleAddSubmit}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
