import "./WeatherCard.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temp = weatherData.temp?.[currentTemperatureUnit] || 999;
  const unit = currentTemperatureUnit === "F" ? "°F" : "°C";

  return (
    <section className="weather">
      <div className="weather__info">
        <h2 className="weather__temp">
          {temp} {unit}
        </h2>
        <p className="weather__city">{weatherData.city}</p>
      </div>
    </section>
  );
}

export default WeatherCard;
