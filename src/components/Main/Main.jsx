import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "../Main/Main.css";

function Main({ weatherData, clothingItems, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        title={`Today is ${weatherData.temp[currentTemperatureUnit]}°${currentTemperatureUnit} / You may want to wear:`}
      />
    </main>
  );
}

export default Main;
