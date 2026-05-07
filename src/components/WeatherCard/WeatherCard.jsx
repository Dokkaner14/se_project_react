import "./WeatherCard.css";
import {
  weatherDataOptions,
  weatherOptionsDefault,
} from "../../utils/constants";

function WeatherCard({ weatherData, handleTempUnit, currentTemperatureUnit }) {
  const filteredWeatherOptions = weatherDataOptions.filter((option) => {
    return (
      option.isDay === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOptions;

  if (filteredWeatherOptions.length === 0) {
    weatherOptions = weatherOptionsDefault[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOptions = filteredWeatherOptions[0];
  }

  return (
    <section className="weatherCard__container">
      <img
        className="weatherCard__img"
        src={weatherOptions?.url}
        alt={`displaying ${weatherOptions?.condition} at ${weatherOptions?.isDay ? "day" : "night"}`}
      />
      <p className="weatherCard__temp">
        {handleTempUnit()}&deg;{currentTemperatureUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
