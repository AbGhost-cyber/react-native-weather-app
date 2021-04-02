import { WeatherDataItems } from "../../data/WeatherData";
import Weather from "../../model/Weather";
import { ADD_USER_LOCATION_WEATHER } from "../actions/weather";

export const initialState = {
  weatherData: WeatherDataItems,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_LOCATION_WEATHER:
      const userLocWeather = new Weather(
        action.locData.latitude,
        action.locData.longtitude,
        action.locData.cityName,
        action.locData.baseUrl,
        action.locData.unitsSystem,
        action.locData.apiKey
      );

      return {
        ...state,
        weatherData: state.weatherData.splice(0, 0, userLocWeather),
      };
  }
  return state;
};
