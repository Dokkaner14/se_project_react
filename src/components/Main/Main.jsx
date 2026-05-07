import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./Main.css";

function Main({ clothingItems, weatherData, handleCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const handleTempUnit = () => {
    if (currentTemperatureUnit === "C") {
      return weatherData.temp.C;
    } else {
      return weatherData.temp.F;
    }
  };

  return (
    <main className="main">
      <WeatherCard
        weatherData={weatherData}
        handleTempUnit={handleTempUnit}
        currentTemperatureUnit={currentTemperatureUnit}
      />
      <section className="cards">
        <p className="cards__header">
          Today is {handleTempUnit()}&deg;{currentTemperatureUnit} / you may
          want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  item={item}
                  key={item._id}
                  handleCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
