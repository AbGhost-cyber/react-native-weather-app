import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Animated, { divide } from "react-native-reanimated";
import { useScrollHandler } from "react-native-redash/lib/module/v1";
import { useSelector, useDispatch } from "react-redux";
import * as Location from "expo-location";

import WeatherItem from "../components/WeatherItem";
import Dots from "../components/Dots";
import { addWeather } from "../store/actions/weather";
import * as weatherActions from "../store/actions/weather";

const { width, height } = Dimensions.get("window");

const WeatherScreen = (props) => {
  const { scrollHandler, x } = useScrollHandler();

  let weatherData = useSelector((state) => state.weathers.weatherData);

  const dispatch = useDispatch();
  const fetchUserLocData = useCallback(async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      // setErrorMessage("Access to Location is required to run the app");
      return;
    }
    const location = await Location.getCurrentPositionAsync();

    const city = await Location.reverseGeocodeAsync(location.coords);
    console.log(city[0].city);

    dispatch(addWeather(city[0].city, "metric"));
    dispatch(weatherActions.userLocIsSaved(true));
    console.log(weatherData.length);
  }, [dispatch]);

  useEffect(() => {
    fetchUserLocData();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={styles.slider}>
        <Animated.ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          bounces={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          {...scrollHandler}
        >
          {weatherData.map((weather, index) => {
            return (
              <WeatherItem
                key={index}
                city={weather.cityName}
                weatherUrl={weather.getUrl()}
                unitsys={weather.unitsSystem}
              />
            );
          })}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.pagination}>
        {weatherData.map((_, index) => {
          return (
            <Dots key={index} currentIndex={divide(x, width)} index={index} />
          );
        })}
      </View>
    </View>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  slider: {
    height: height,
  },
  pagination: {
    top: -290,
    flexDirection: "row",
    //marginTop: -500,
  },
});
