import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
  Button,
} from "react-native";
import { useSelector } from "react-redux";

import WeatherInfo from "./WeatherInfo";
import UnitsPicker from "./UnitsPicker";
import { colors } from "../constants/index";
import ReloadIcon from "./ReloadIcon";
import WeatherDetails from "./WeatherDetails";

const { width } = Dimensions.get("window");

const WeatherItem = ({ unitsys, weatherUrl }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState(unitsys);

  const userLocIsSaved = useSelector((state) => state.weathers.isLocSaved);

  useEffect(() => {
    //if user's location data has been saved to redux then load other cities
    if (userLocIsSaved) {
      load();
    }
  }, [unitsSystem, userLocIsSaved]);

  const load = async () => {
    setCurrentWeather(null);
    setErrorMessage(null);
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
  };

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
