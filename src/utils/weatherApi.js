import { APIkey, coordinates } from "./constants";

export function getWeatherCondition(temp) {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}

export function getWeather(
  lat = coordinates.latitude,
  lon = coordinates.longitude,
) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`,
  )
    .then((res) => res.json())
    .then((data) => {
      return {
        temp: data.main.temp,
        city: data.name,
        condition: getWeatherCondition(data.main.temp),
      };
    });
}
