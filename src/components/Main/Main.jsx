import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import "../Main/Main.css";

function Main({ weatherData, clothingItems, handleCardClick }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        title={`Today is ${weatherData.temp.F}°F / You may want to wear:`}
      />
    </main>
  );
}

export default Main;
