import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Animated, { multiply, divide } from "react-native-reanimated";
import { useScrollHandler } from "react-native-redash/lib/module/v1";

import WeatherItem, { userLocationWeather } from "../components/WeatherItem";
import { WeatherDataItems } from "../data/WeatherData";

const { width, height } = Dimensions.get("window");

const WeatherScreen = () => {
  const { scrollHandler, x } = useScrollHandler();

  //insert user's current location in to the weather's first index
  WeatherDataItems.unshift(userLocationWeather);
  
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
          {WeatherDataItems.map((weather, index) => (
            <WeatherItem
              key={index}
              city={weather.cityName}
              weatherUrl={weather.getUrl}
            />
          ))}
        </Animated.ScrollView>
      </Animated.View>
    </View>
  );
};

export default WeatherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slider: {
    height: height,
  },
});
