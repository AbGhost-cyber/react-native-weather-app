import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Animated, { multiply, divide } from "react-native-reanimated";
import { useScrollHandler } from "react-native-redash/lib/module/v1";
import { useSelector } from "react-redux";

import WeatherItem from "../components/WeatherItem";
import Dots from "../components/Dots";

const { width, height } = Dimensions.get("window");

const WeatherScreen = () => {
  const { scrollHandler, x } = useScrollHandler();
  const weatherData = useSelector((state) => state.weathers.weatherData);
  console.log(weatherData);

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
