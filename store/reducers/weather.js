import { WeatherDataItems } from "../../screenshots/data/WeatherData";
import UserLocState from "../../model/UserLocState";
import Weather from "../../model/Weather";
import { ADD_USER_LOCATION_WEATHER, USER_LOC_SAVED } from "../actions/weather";

export const initialState = {
  weatherData: WeatherDataItems,
  userLocState: UserLocState,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_LOCATION_WEATHER:
      const userLocWeather = new Weather(
        action.locData.id,
        action.locData.cityName
      );
      let updatedWeatherData = state.weatherData.slice();
      updatedWeatherData.unshift(userLocWeather);


      return {
        ...state,
        weatherData: updatedWeatherData
      };
    case USER_LOC_SAVED:
      const userLocState = new UserLocState(
        action.locState.wasRejected,
        action.locState.isSaved
      );
      return {
        ...state,
        userLocState,
      };
  }
  return state;
};
