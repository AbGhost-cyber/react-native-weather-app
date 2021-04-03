import { WEATHER_API_KEY } from "react-native-dotenv";
import { BASE_WEATHER_URL } from "../constants";

class Weather {
  constructor(id, cityName, unitsSystem) {
    this.id = id;
    this.cityName = cityName;
    this.unitsSystem = unitsSystem;
  }
  #API_KEY = WEATHER_API_KEY;
  #BASE_URL = BASE_WEATHER_URL;
  getUrl() {
    return `${this.#BASE_URL}q=${this.cityName}&units=${
      this.unitsSystem
    }&appid=${this.#API_KEY}`;
  }
}

export default Weather;
