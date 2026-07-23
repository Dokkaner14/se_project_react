import "./WeatherCard.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temp = weatherData.temp?.[currentTemperatureUnit] || 999;
  const unit = currentTemperatureUnit === "F" ? "°F" : "°C";

  return (
    <section className="weather-card">
      <div className="weather-card__info">
        <h2 className="weather-card__temp">
          {temp} {unit}
        </h2>
        <p className="weather-card__city">{weatherData.city}</p>
      </div>

      {weatherData.image && (
        <img
          src={weatherData.image}
          alt={`Weather: ${weatherData.type}`}
          className="weather-card__image"
        />
      )}
    </section>
  );
}

export default WeatherCard;
