import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";

import WeatherInfo from "./WeatherInfo";
import UnitsPicker from "./UnitsPicker";
import { colors } from "../constants/index";
import ReloadIcon from "./ReloadIcon";
import WeatherDetails from "./WeatherDetails";
import { WEATHER_API_KEY } from "react-native-dotenv";
import { BASE_WEATHER_URL } from "../constants";

const { width } = Dimensions.get("window");

const WeatherItem = ({ city }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState("metric");

  const userLocState = useSelector((state) => state.weathers.userLocState);

  useEffect(() => {
    //if user's location data has been saved to redux then load other cities
    if (userLocState.isSaved && !userLocState.wasRejected) {
      load();
    }
  }, [unitsSystem, userLocState]);

  const load = useCallback(async () => {
    setCurrentWeather(null);
    setErrorMessage(null);
    let weatherUrl = `${BASE_WEATHER_URL}q=${city}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;
    try {
      const response = await fetch(weatherUrl);
      const result = await response.json();
      
      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, []);

  const formattedUnixTime = useCallback((sunrise, sunset, timezone) => {
    const sunriseDate = new Date((sunrise + timezone) * 1000);
    const sunsetDate = new Date((sunset + timezone) * 1000);

    const sunriseTime = sunriseDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const sunsetTime = sunsetDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${sunriseTime}/${sunsetTime}`;
  }, []);

  if (currentWeather || userLocState.IsSaved) {
    let [sunRiseTime, sunSetTime] = formattedUnixTime(
      currentWeather.sys.sunrise,
      currentWeather.sys.sunset,
      currentWeather.timezone - currentWeather.dt - 2
    ).split("/");
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ReloadIcon
          load={() => {
            load();
          }}
        />
        <UnitsPicker
          unitsSystem={unitsSystem}
          setUnitsSystem={setUnitsSystem}
        />
        <View style={styles.main}>
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <View style={{ justifyContent: "center", marginTop: 30 }}>
          <WeatherDetails
            sunRiseTime={sunRiseTime}
            sunSetTime={sunSetTime}
            currentWeather={currentWeather}
            unitsSystem={unitsSystem}
          />
        </View>
      </View>
    );
  } else if (errorMessage || userLocState.wasRejected) {
    return (
      <View style={styles.container}>
        <Text style={{ alignSelf: "center" }}>
          {errorMessage
            ? errorMessage
            : "Access to Location is required to run the app"}
        </Text>
        <ReloadIcon
          load={() => {
            load();
          }}
        />
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <ReloadIcon
          load={() => {
            load();
          }}
        />
        <StatusBar style="auto" />
      </View>
    );
  }
};

export default WeatherItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    width: width,
  },
  main: {
    justifyContent: "center",
    marginTop: 60,
    //flex: 1,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
