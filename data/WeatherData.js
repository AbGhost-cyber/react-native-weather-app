import Weather from "../model/Weather";
import { BASE_WEATHER_URL } from "../constants";
import { WEATHER_API_KEY } from "react-native-dotenv";

export const WeatherDataItems = [
  new Weather(
    null,
    null,
    "new york",
    BASE_WEATHER_URL,
    "metric",
    WEATHER_API_KEY
  ),
  new Weather(
    null,
    null,
    "shanghai",
    BASE_WEATHER_URL,
    "metric",
    WEATHER_API_KEY
  ),
  new Weather(
    null,
    null,
    "nanchang",
    BASE_WEATHER_URL,
    "metric",
    WEATHER_API_KEY
  ),
  new Weather(
    null,
    null,
    "washington",
    BASE_WEATHER_URL,
    "metric",
    WEATHER_API_KEY
  ),
  new Weather(null, null, "delhi", BASE_WEATHER_URL, "metric", WEATHER_API_KEY),
  new Weather(null, null, "lagos", BASE_WEATHER_URL, "metric", WEATHER_API_KEY),
  new Weather(
    null,
    null,
    "beijing",
    BASE_WEATHER_URL,
    "metric",
    WEATHER_API_KEY
  ),
  new Weather(
    null,
    null,
    "london",
    BASE_WEATHER_URL,
    "metric",
    WEATHER_API_KEY
  ),
];
