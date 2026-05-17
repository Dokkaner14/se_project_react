import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temp = weatherData.temp?.[currentTemperatureUnit] || 999;
  const unit = currentTemperatureUnit === "F" ? "°F" : "°C";

  // Simple fallback image logic for Sprint 11
  const getWeatherImage = () => {
    const condition = (weatherData.condition || "cloudy").toLowerCase();
    const isDay = weatherData.isDay ?? true;

    if (condition.includes("clear") || condition.includes("sun")) {
      return isDay ? "/day/sunny.jpg" : "/night/clear.jpg";
    }
    if (condition.includes("cloud")) {
      return isDay ? "/day/cloudy.jpg" : "/night/cloudy.jpg";
    }
    if (condition.includes("rain") || condition.includes("storm")) {
      return isDay ? "/day/rain.jpg" : "/night/rain.jpg";
    }
    return isDay ? "/day/cloudy.jpg" : "/night/cloudy.jpg";
  };

  return (
    <section
      className="weather"
      style={{ backgroundImage: `url(${getWeatherImage()})` }}
    >
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
