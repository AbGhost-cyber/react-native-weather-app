import Weather from "../../model/Weather";

export const ADD_USER_LOCATION_WEATHER = "ADD_USER_LOCATION_WEATHER";
export const USER_LOC_SAVED = "USER_LOC_SAVED";

export const addWeather = (id, cityName) => {
  return {
    type: ADD_USER_LOCATION_WEATHER,
    locData: {
      id,
      cityName,
    },
  };
};

export const checkUserLocState = (wasRejected, isSaved) => {
  return {
    type: USER_LOC_SAVED,
    locState: {
      wasRejected,
      isSaved,
    },
  };
};
