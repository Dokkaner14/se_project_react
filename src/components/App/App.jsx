import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer.jsx";
import { defaultClothingItems } from "../../utils/clothingItems.js";
import { getWeather } from "../../utils/weatherApi.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [weather, setWeather] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  /*Tracks which modal is currently open ("preview" or "")*/
  const [selectedCard, setSelectedCard] = useState(null);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");

  function handleOpenModal(modalName, card = null) {
    console.log("handleOpenModal fired:", modalName, card);
    setActiveModal(modalName);
    setSelectedCard(card);
  } /* Opens the selected modal and stores the clicked card data */

  const handleAddClick = () => {
    console.log("Add clothes clicked");
    setActiveModal("add-garment");
    console.log("setting activeModal to add-garment");
  };

  function handleAddGarmentSubmit(evt) {
    evt.preventDefault();

    const newItem = {
      id: Date.now(),
      name,
      link: imageUrl,
      weather: weatherType,
    };

    setClothingItems([...clothingItems, newItem]);

    setName("");
    setImageUrl("");
    setWeatherType("");
    handleCloseModal();
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
    console.log("useEffect running");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeather(latitude, longitude)
            .then((data) => {
              setWeather(data);
            })
            .catch((err) => {
              console.error("Weather fetch failed:", err);
            });
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Fallback to default coordinates
          getWeather()
            .then((data) => {
              setWeather(data);
            })
            .catch((err) => {
              console.error("Weather fetch failed:", err);
            });
        },
      );
    } else {
      // Fallback if geolocation is not supported
      getWeather()
        .then((data) => {
          setWeather(data);
        })
        .catch((err) => {
          console.error("Weather fetch failed:", err);
        });
    }
  }, []);

  console.log("current activeModal:", activeModal);

  const isFormValid =
    name.trim() !== "" && imageUrl.trim() !== "" && weatherType !== "";
  console.log("FORM STATE:", name, imageUrl, weatherType, isFormValid);

  return (
    <>
      <div className="page">
        <div className="page__wrapper">
          <Header onAddClick={handleAddClick} city={weather?.city} />
          <Main
            weather={weather}
            clothingItems={clothingItems}
            onCardClick={handleOpenModal}
            onAddClick={handleAddClick}
          />
          <Footer />
        </div>
      </div>

      {/* ADD GARMENT MODAL */}
      {activeModal === "add-garment" && (
        <ModalWithForm
          title="New garment"
          name="add-garment"
          buttonText="Add garment"
          isOpen={true}
          onClose={handleCloseModal}
          isValid={isFormValid}
          onSubmit={handleAddGarmentSubmit}
        >
          <label className="modal__label">
            Name
            <input
              type="text"
              className="modal__input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="modal__label">
            Image
            <input
              type="url"
              className="modal__input"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>

          <fieldset className="modal__fieldset">
            <legend className="modal__legend">Select the weather type:</legend>

            <div className="modal__radio-buttons">
              <label className="modal__radio-label">
                <input
                  type="radio"
                  name="weather"
                  value="hot"
                  checked={weatherType === "hot"}
                  onChange={(e) => setWeatherType(e.target.value)}
                />
                Hot
              </label>

              <label className="modal__radio-label">
                <input
                  type="radio"
                  name="weather"
                  value="warm"
                  checked={weatherType === "warm"}
                  onChange={(e) => setWeatherType(e.target.value)}
                />
                Warm
              </label>

              <label className="modal__radio-label">
                <input
                  type="radio"
                  name="weather"
                  value="cold"
                  checked={weatherType === "cold"}
                  onChange={(e) => setWeatherType(e.target.value)}
                />
                Cold
              </label>
            </div>
          </fieldset>
        </ModalWithForm>
      )}

      {/* PREVIEW MODAL */}
      {activeModal === "preview" && (
        <ItemModal card={selectedCard} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;
