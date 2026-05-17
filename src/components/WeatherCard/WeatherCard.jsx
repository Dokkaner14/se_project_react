import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temp = weatherData.temp?.[currentTemperatureUnit] || "--";
  const unit = currentTemperatureUnit === "F" ? "°F" : "°C";

  return (
    <section
      className="weather"
      style={{
        backgroundImage: `url(${weatherData.isDay ? "/day/cloudy.jpg" : "/night/cloudy.jpg"})`,
      }}
    >
      <div className="weather__info">
        <h2 className="weather__temp">
          {temp}
          {unit}
        </h2>
        <p className="weather__city">{weatherData.city}</p>
      </div>
    </section>
  );
}

export default WeatherCard;
