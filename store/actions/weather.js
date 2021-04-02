import Weather from "../../model/Weather";

export const ADD_USER_LOCATION_WEATHER = "ADD_USER_LOCATION_WEATHER";

export const addWeather = (
  latitude,
  longitude,
  cityName,
  baseUrl,
  unitsSystem,
  apikey
) => {
  return {
    type: ADD_USER_LOCATION_WEATHER,
    locData: {
      latitude,
      longitude,
      cityName,
      baseUrl,
      unitsSystem,
      apikey,
    },
  };
};
