const weatherDataOptions = [
  // day
  {
    isDay: true,
    condition: "clear",
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition: "clouds",
    url: new URL("../assets/day/cloudy.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition: "rain",
    url: new URL("../assets/day/rain.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition: "storm",
    url: new URL("../assets/day/storm.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition: "snow",
    url: new URL("../assets/day/snow.png", import.meta.url).href,
  },
  {
    isDay: true,
    condition: "fog",
    url: new URL("../assets/day/fog.png", import.meta.url).href,
  },

  // night
  {
    isDay: false,
    condition: "clear",
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },
  {
    isDay: false,
    condition: "clouds",
    url: new URL("../assets/night/cloudy.png", import.meta.url).href,
  },
  {
    isDay: false,
    condition: "rain",
    url: new URL("../assets/night/rain.png", import.meta.url).href,
  },
  {
    isDay: false,
    condition: "storm",
    url: new URL("../assets/night/storm.png", import.meta.url).href,
  },
  {
    isDay: false,
    condition: "snow",
    url: new URL("../assets/night/snow.png", import.meta.url).href,
  },
  {
    isDay: false,
    condition: "fog",
    url: new URL("../assets/night/fog.png", import.meta.url).href,
  },
];

const weatherOptionsDefault = {
  day: {
    url: new URL("../assets/day/default.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/night/default.png", import.meta.url).href,
  },
};

const apiKey = "d78765a621734c77c9d85d05aec84255";

const coordinates = {
  latitude: 42.060039,
  longitude: -88.031874,
};

export { coordinates, apiKey, weatherDataOptions, weatherOptionsDefault };
