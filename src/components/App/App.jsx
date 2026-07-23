import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmModal/DeleteConfirmModal";
import Footer from "../Footer/Footer";

import { coordinates, apiKey } from "../../utils/constants";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  addItem,
  removeItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal";

import { register, authorize, checkToken } from "../../utils/auth";
import { updateUserProfile } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const openModal = (modalName) => setActiveModal(modalName);
  const closeModal = () => setActiveModal("");

  // Login with hard refresh
  const handleLogin = (values, resetForm) => {
    authorize(values)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        resetForm();
        closeModal();
        window.location.reload(); // Forces full page refresh
      })
      .catch((err) => {
        console.error("Login failed:", err);
        alert("Login failed. Please try again.");
      });
  };

  // Register with hard refresh
  const handleRegister = (values, resetForm) => {
    register(values)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        resetForm();
        closeModal();
        window.location.reload(); // Forces full page refresh
      })
      .catch((err) => {
        console.error("Registration failed:", err);
        alert("Registration failed. Please try again.");
      });
  };

  const handleUpdateUser = (values, resetForm) => {
    const token = localStorage.getItem("jwt");
    return updateUserProfile(values, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        resetForm();
        closeModal();
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Update failed. Please try again.");
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  // Initial data load and token check
  useEffect(() => {
    getWeatherData(coordinates, apiKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);

    getItems()
      .then((data) => setClothingItems(data.reverse()))
      .catch(console.error);

    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => localStorage.removeItem("jwt"));
    }
  }, []);

  // ESC key handler
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    openModal("preview");
  };

  const handleAddItem = (inputValues, resetForm) => {
    addItem(inputValues)
      .then((response) => {
        const newItem = response.data || response;
        setClothingItems((prev) => [newItem, ...prev]);
        resetForm();
        closeModal();
      })
      .catch(console.error);
  };

  const handleDeleteClick = (card) => {
    setSelectedCard(card);
    openModal("delete-confirmation");
  };

  const handleDeleteItem = () => {
    removeItem(selectedCard._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== selectedCard._id),
        );
        closeModal();
      })
      .catch(console.error);
  };

  const handleCardLike = (item) => {
    if (!currentUser) return;

    const isLiked = Array.isArray(item.likes)
      ? item.likes.some((id) => id === currentUser._id)
      : false;

    const likePromise = isLiked
      ? removeCardLike(item._id)
      : addCardLike(item._id);

    likePromise
      .then((response) => {
        const updatedItem = response.data || response;
        setClothingItems((prev) =>
          prev.map((clothItem) =>
            clothItem._id === updatedItem._id ? updatedItem : clothItem,
          ),
        );
      })
      .catch(console.error);
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header
            handleAddClick={() => openModal("add-garment")}
            weatherData={weatherData}
            openLogin={() => openModal("login")}
            openRegister={() => openModal("register")}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                />
              }
            />
            <Route
              path="/profile"
              element={
                isLoggedIn ? (
                  <Profile
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    handleAddClick={() => openModal("add-garment")}
                    onEditProfile={() => openModal("edit-profile")}
                    onSignOut={handleSignOut}
                    onCardLike={handleCardLike}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>

          <Footer />

          {/* Modals */}
          {activeModal === "add-garment" && (
            <AddItemModal
              isOpen={true}
              onCloseModal={closeModal}
              onAddItem={handleAddItem}
            />
          )}

          {activeModal === "preview" && (
            <ItemModal
              isOpen={true}
              card={selectedCard}
              onClose={closeModal}
              onDeleteClick={handleDeleteClick}
            />
          )}

          {activeModal === "delete-confirmation" && (
            <DeleteConfirmationModal
              isOpen={true}
              onClose={closeModal}
              onConfirm={handleDeleteItem}
            />
          )}

          {activeModal === "login" && (
            <LoginModal
              isOpen={true}
              onClose={closeModal}
              onLogin={handleLogin}
              onOpenRegister={() => openModal("register")}
            />
          )}

          {activeModal === "register" && (
            <RegisterModal
              isOpen={true}
              onClose={closeModal}
              onRegister={handleRegister}
              onOpenLogin={() => openModal("login")}
            />
          )}

          {activeModal === "edit-profile" && (
            <EditProfileModal
              isOpen={true}
              onClose={closeModal}
              onUpdateUser={handleUpdateUser}
            />
          )}
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
