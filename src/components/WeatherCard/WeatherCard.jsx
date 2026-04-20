import weatherImage from "../../assets/weather.png";
import "./WeatherCard.css";

function WeatherCard({ weather }) {
  const weatherClass = weather?.condition
    ? `weather__card weather__card_${weather.condition}`
    : "weather__card";

  return (
    <section className={weatherClass} style={{ marginTop: "20px" }}>
      <div className="weather__images">
        <img
          className="weather__card-img"
          src={weatherImage}
          alt="Weather background image"
        />
        <p className="weather__card-temp">
          {weather?.temp !== undefined ? Math.round(weather.temp) : ""}°
        </p>
      </div>
      <p className="weather__card-info">
        Today is {weather?.temp !== undefined ? Math.round(weather.temp) : ""}°F
        / You may want to wear:
      </p>
    </section>
  );
}

export default WeatherCard;
