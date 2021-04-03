import Weather from "../../model/Weather";

export const ADD_USER_LOCATION_WEATHER = "ADD_USER_LOCATION_WEATHER";
export const USER_LOC_SAVED = "USER_LOC_SAVED";

export const addWeather = (cityName, unitsSystem) => {
  return {
    type: ADD_USER_LOCATION_WEATHER,
    locData: {
      cityName,
      unitsSystem,
    },
  };
};

export const userLocIsSaved = (isSaved) => {
  return {
    type: USER_LOC_SAVED,
    isSaved,
  };
};
