import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import weatherReducer from "./store/reducers/weather";
import WeatherNavigator from "./navigation/WeatherNavigator";

enableScreens();

const rootReducers = combineReducers({
  weathers:weatherReducer
})
const store = createStore(rootReducers)
const fetchFonts = () => {
  return Font.loadAsync({
    "Product-Sans": require("./assets/fonts/ProductSansRegular.ttf"),
    "Product-Sans-Bold": require("./assets/fonts/ProductSansBold.ttf"),
  });
};

export default function App() {
  const [fontIsLoaded, setFontIsLoaded] = useState(false);

  if (!fontIsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontIsLoaded(true)}
        onError={console.warn}
      />
    );
  }
  return <Provider store={store}>
  <WeatherNavigator/>
  </Provider>;
}
