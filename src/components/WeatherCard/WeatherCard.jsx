import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import {
  weatherDataOptions,
  weatherOptionsDefault,
} from "../../utils/constants.js";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temp = weatherData.temp[currentTemperatureUnit];
  const unit = currentTemperatureUnit === "F" ? "°F" : "°C";

  const getWeatherImage = () => {
    if (!weatherData.condition) {
      return weatherData.isDay
        ? weatherOptionsDefault.day.url
        : weatherOptionsDefault.night.url;
    }

    const condition = weatherData.condition.toLowerCase();

    const found = weatherDataOptions.find(
      (item) =>
        item.condition === condition && item.isDay === weatherData.isDay,
    );

    return found
      ? found.url
      : weatherData.isDay
        ? weatherOptionsDefault.day.url
        : weatherOptionsDefault.night.url;
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
