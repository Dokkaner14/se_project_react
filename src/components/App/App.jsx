import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import MobileMenu from "../MobileMenu/MobileMenu";
import Footer from "../Footer/Footer";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
import DeleteConfirmationModal from "../DeleteConfirmModal/DeleteConfirmModal";
import { coordinates, apiKey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {
  getItems,
  addItem,
  removeItem,
  updateUserProfile,
} from "../../utils/api";
import EditProfileModal from "../EditProfileModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { register, authorize, checkToken } from "../../utils/auth";
import { addCardLike, removeCardLike } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onAddItem = (inputValues, handleReset) => {
    const newCardData = {
      _id: Date.now(),
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems((items) => [data, ...items]);
        handleReset();
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = () => {
    setActiveModal("delete-confirmation");
  };

  const handleConfirmDelete = () => {
    removeItem(selectedCard._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== selectedCard._id),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleAddClick = () => {
    console.log("handleAddClick fired");
    setActiveModal("add-garment");
  };

  const handleMenuClick = () => {
    setActiveModal("mobile-menu");
  };

  const openRegister = () => setIsRegisterModalOpen(true);
  const openLogin = () => setIsLoginModalOpen(true);
  const closeRegister = () => setIsRegisterModalOpen(false);
  const closeLogin = () => setIsLoginModalOpen(false);
  const openEditProfile = () => setIsEditProfileModalOpen(true);
  const closeEditProfile = () => setIsEditProfileModalOpen(false);

  const closeActiveModal = () => {
    setActiveModal("");
  };

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    closeActiveModal();
    navigate("/");
  }

  useEffect(() => {
    getWeatherData(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        setClothingItems([...data].reverse());
      })
      .catch(console.error);
    // Check for stored JWT token and validate
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token check failed:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  function handleRegister(values, resetForm) {
    setLoading(true);
    const { name, avatar, email, password } = values;

    register({ name, avatar, email, password })
      .then(() => {
        // automatically sign in after successful signup
        return authorize({ email, password });
      })
      .then((data) => {
        if (data?.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          return checkToken(data.token);
        }
        return Promise.reject("No token returned");
      })
      .then((user) => {
        setCurrentUser(user);
        resetForm();
        closeRegister();
        navigate("/");
      })
      .catch((err) => {
        console.error("Register error:", err);
      })
      .finally(() => setLoading(false));
  }

  function handleLogin(values, resetForm) {
    setLoading(true);
    const { email, password } = values;

    authorize({ email, password })
      .then((data) => {
        if (data?.token) {
          localStorage.setItem("jwt", data.token);
          setIsLoggedIn(true);
          return checkToken(data.token);
        }
        return Promise.reject("No token returned");
      })
      .then((user) => {
        setCurrentUser(user);
        resetForm();
        closeLogin();
        navigate("/");
      })
      .catch((err) => console.error("Login error:", err))
      .finally(() => setLoading(false));
  }

  function handleUpdateUser(values, resetForm) {
    const { name, avatar } = values;
    return updateUserProfile({ name, avatar })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        resetForm();
        closeEditProfile();
        return updatedUser;
      })
      .catch((err) => {
        console.error("Update profile error:", err);
        return Promise.reject(err);
      });
  }

  function handleCardLike(item) {
    if (!currentUser) return Promise.reject("Not authorized");

    const token = localStorage.getItem("jwt");
    const isLiked = Array.isArray(item.likes)
      ? item.likes.some((id) => id === currentUser._id)
      : false;

    const likeAction = isLiked ? removeCardLike : addCardLike;

    return likeAction(item._id, token)
      .then((updatedItem) => {
        setClothingItems((items) =>
          items.map((it) => (it._id === updatedItem._id ? updatedItem : it)),
        );
        return updatedItem;
      })
      .catch((err) => {
        console.error("Like action failed:", err);
        return Promise.reject(err);
      });
  }

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleMenuClick={handleMenuClick}
              weatherData={weatherData}
              openLogin={openLogin}
              openRegister={openRegister}
              openEditProfile={openEditProfile}
              handleSignOut={handleSignOut}
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
                    currentTemperatureUnit={currentTemperatureUnit}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  isLoggedIn ? (
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onEditProfile={openEditProfile}
                      onCardLike={handleCardLike}
                      onSignOut={handleSignOut}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>
            <Footer />
          </div>
          {activeModal === "add-garment" && (
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onCloseModal={closeActiveModal}
              onAddItem={onAddItem}
            />
          )}
          {activeModal === "preview" && (
            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onClose={closeActiveModal}
              onDeleteClick={handleDeleteItem}
            />
          )}

          {activeModal === "delete-confirmation" && (
            <DeleteConfirmationModal
              isOpen={activeModal === "delete-confirmation"}
              onClose={closeActiveModal}
              onConfirm={handleConfirmDelete}
            />
          )}

          {activeModal === "mobile-menu" && (
            <MobileMenu
              onClose={closeActiveModal}
              handleAddClick={handleAddClick}
            />
          )}

          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={closeRegister}
            onRegister={handleRegister}
          />

          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={closeLogin}
            onLogin={handleLogin}
          />
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={closeEditProfile}
            onUpdateUser={handleUpdateUser}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
