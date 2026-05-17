import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weather, clothingItems, onCardClick, onAddClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  // wait until weather loads
  if (!weather || !weather.temp) {
    return (
      <main className="container">
        <p>Loading...</p>
      </main>
    );
  }
  console.log("clothingItems in Main:", clothingItems);

  return (
    <main className="container">
      <WeatherCard weather={weather} />

      <ul className="main__items">
        {clothingItems?.map((item) => (
          <ItemCard key={item.id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </main>
  );
}

export default Main;
