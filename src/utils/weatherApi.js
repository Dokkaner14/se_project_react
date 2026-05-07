import { handleServerResponse } from "./api";

function getWeatherData({ latitude, longitude }, apiKey) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  ).then((res) => {
    return handleServerResponse(res);
  });
}

const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round((data.main.temp - 32) * (5 / 9)),
  };
  result.type = getWeatherCondition(result.temp.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());

  return result;
};

function isDay({ sunrise, sunset }, now) {
  return sunrise * 1000 < now && sunset * 1000 > now;
}

function getWeatherCondition(temp) {
  if (temp > 86) {
    return "hot";
  } else if (temp >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}
export { getWeatherData, filterWeatherData };
