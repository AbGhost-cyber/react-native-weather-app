import { WeatherDataItems } from "../../data/WeatherData";
import Weather from "../../model/Weather";
import { ADD_USER_LOCATION_WEATHER, USER_LOC_SAVED } from "../actions/weather";

export const initialState = {
  weatherData: WeatherDataItems,
  isLocSaved: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_LOCATION_WEATHER:
      const userLocWeather = new Weather(
        10,
        action.locData.cityName,
        action.locData.unitsSystem
      );
      const updatedWeatherData = state.weatherData.slice()
      updatedWeatherData.unshift(userLocWeather);

      return {
        ...state,
        weatherData: updatedWeatherData,
      };
    case USER_LOC_SAVED:
      return {
        ...state,
        isLocSaved: action.isSaved,
      };
  }
  return state;
};
