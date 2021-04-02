import React from "react";
import { StyleSheet } from "react-native";
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";
import { colors } from "../constants";

const Dots = ({ index, currentIndex }) => {
  const opacity = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });

  const scale = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [1, 1.25, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={{ ...styles.dot, opacity: opacity, transform: [{ scale }] }}
    />
  );
};
const styles = StyleSheet.create({
  dot: {
    backgroundColor: colors.PRIMARY_COLOR,
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 8,
  },
});

export default Dots;
