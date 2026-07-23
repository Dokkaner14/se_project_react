import { handleServerResponse } from "./api";

// Import all weather images (from src/utils/)
import clearDay from "../assets/day/clear.png";
import cloudyDay from "../assets/day/cloudy.png";
import rainDay from "../assets/day/rain.png";
import snowDay from "../assets/day/snow.png";
import stormDay from "../assets/day/storm.png";
import fogDay from "../assets/day/fog.png";
import defaultDay from "../assets/day/default.png";

import clearNight from "../assets/night/clear.png";
import cloudyNight from "../assets/night/cloudy.png";
import rainNight from "../assets/night/rain.png";
import snowNight from "../assets/night/snow.png";
import stormNight from "../assets/night/storm.png";
import fogNight from "../assets/night/fog.png";
import defaultNight from "../assets/night/default.png";

function getWeatherData({ latitude, longitude }, apiKey) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  ).then((res) => handleServerResponse(res));
}

const filterWeatherData = (data) => {
  const result = {};

  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round((data.main.temp - 32) * (5 / 9)),
  };

  result.condition = data.weather[0].main.toLowerCase();
  result.type = getWeatherCondition(result.temp.F);
  result.isDay = isDay(data.sys, Date.now());

  result.image = getWeatherImage(result.condition, result.isDay);

  return result;
};

function isDay({ sunrise, sunset }, now) {
  return sunrise * 1000 < now && sunset * 1000 > now;
}

function getWeatherCondition(temp) {
  if (temp > 86) return "hot";
  else if (temp >= 66) return "warm";
  else return "cold";
}

function getWeatherImage(condition, isDay) {
  const imageMap = {
    clear: isDay ? clearDay : clearNight,
    clouds: isDay ? cloudyDay : cloudyNight,
    rain: isDay ? rainDay : rainNight,
    drizzle: isDay ? rainDay : rainNight,
    snow: isDay ? snowDay : snowNight,
    thunderstorm: isDay ? stormDay : stormNight,
    fog: isDay ? fogDay : fogNight,
    mist: isDay ? fogDay : fogNight,
    smoke: isDay ? fogDay : fogNight,
    haze: isDay ? fogDay : fogNight,
    dust: isDay ? fogDay : fogNight,
  };

  return imageMap[condition] || (isDay ? defaultDay : defaultNight);
}

export { getWeatherData, filterWeatherData };
