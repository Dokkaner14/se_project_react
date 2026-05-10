import "./WeatherCard.css";
import { useContext } from "react";
import {
  weatherDataOptions,
  weatherOptionsDefault,
} from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

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

  const temperature =
    currentTemperatureUnit === "C" ? weatherData.temp.C : weatherData.temp.F;

  return (
    <section className="weatherCard__container">
      <img
        className="weatherCard__img"
        src={weatherOptions?.url}
        alt={`displaying ${weatherOptions?.condition} at ${weatherOptions?.isDay ? "day" : "night"}`}
      />
      <p className="weatherCard__temp">
        {temperature}&deg;{currentTemperatureUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
