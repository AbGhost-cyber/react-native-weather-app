import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import WeatherScreen from "../screens/WeatherScreen";

const WeatherNav = createStackNavigator(
  {
    weatherScreen: WeatherScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

export default createAppContainer(WeatherNav);
