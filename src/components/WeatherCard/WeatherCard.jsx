import weatherImage from "../../assets/weather.png";
import "./WeatherCard.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weather }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <section className="weather__card" style={{ marginTop: "20px" }}>
      <div className="weather__images">
        <img
          className="weather__card-img"
          src={weatherImage}
          alt="Weather backgound image"
        />
        <p className="weather__card-temp">
          {weather?.temp?.[currentTemperatureUnit]}°
        </p>
      </div>
      <p className="weather__card-info">
        Today is {weather?.temp?.[currentTemperatureUnit]}°
        {currentTemperatureUnit} / You may want to wear:
      </p>
    </section>
  );
}

export default WeatherCard;
