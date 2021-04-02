import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import { useSelector, useDispatch } from "react-redux";

import { BASE_WEATHER_URL } from "../constants";
import { WEATHER_API_KEY } from "react-native-dotenv";
import WeatherInfo from "./WeatherInfo";
import UnitsPicker from "./UnitsPicker";
import { colors } from "../constants/index";
import ReloadIcon from "./ReloadIcon";
import WeatherDetails from "./WeatherDetails";
import Weather from "../model/Weather";
import { addWeather } from "../store/actions/weather";

const { width } = Dimensions.get("window");

const WeatherItem = ({ unitsys, weatherUrl }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState(unitsys);

  const dispatch = useDispatch();

  //export let userLocationWeather;

  useEffect(() => {
    load();
  }, [unitsSystem]);

  async function load() {
    setCurrentWeather(null);
    setErrorMessage(null);
    try {
      //request location permission
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Access to Location is required to run the app");
        return;
      }
      //const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${WEATHER_API_KEY}`;
      addUserLocationWeather();
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
  }

  const addUserLocationWeather = useCallback(async () => {
    const location = await Location.getCurrentPositionAsync();

    const { latitude, longitude } = location.coords;

    dispatch(
      addWeather(latitude, longitude, null, BASE_WEATHER_URL, unitsSystem)
    );
  }, [unitsSystem]);

  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails
          currentWeather={currentWeather}
          unitsSystem={unitsSystem}
        />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={{ alignSelf: "center" }}>{errorMessage}</Text>
        <ReloadIcon load={load} />
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <ReloadIcon load={load} />
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
    flex: 1,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
