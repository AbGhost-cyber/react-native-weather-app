import React from "react";
import { StyleSheet } from "react-native";
import Animated, { Extrapolate, interpolate } from "react-native-reanimated";
import { colors } from "../constants";
import { Ionicons } from "@expo/vector-icons";

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
      style={{ margin: 4, opacity: opacity, transform: [{ scale }] }}
    >
      <Ionicons
        name={index === 0 ? "navigate" : "ellipse-sharp"}
        size={12}
        color={colors.PRIMARY_COLOR}
      />
    </Animated.View>
  );
};

export default Dots;
