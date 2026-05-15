import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

function Main({ weatherData, clothingItems, handleCardClick }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        // Do NOT pass onCardDelete here (Main page shouldn't show delete)
      />
    </main>
  );
}

export default Main;
