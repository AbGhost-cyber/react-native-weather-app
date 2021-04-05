import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { colors, customFonts } from "../constants/index";

const { PRIMARY_COLOR, SECONDARY_COLOR } = colors;
const { PRO_SANS, PRO_SANS_BOLD } = customFonts;

const WeatherInfo = ({ currentWeather }) => {
  const {
    main: { temp },
    name,
    weather: [details],
  } = currentWeather;
  const { icon, description, main } = details;

  const iconUrl = `http://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <View style={styles.weatherInfo}>
      <Text style={{ fontFamily: PRO_SANS_BOLD }}>{name}</Text>
      <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
      <Text style={styles.textPrimary}>{temp}°</Text>
      <Text style={styles.weatherDesc}>{description}</Text>
      <Text style={styles.textSecondary}>{main}</Text>
    </View>
  );
};

export default WeatherInfo;

const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: "center",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherDesc: {
    textTransform: "capitalize",
    fontFamily: PRO_SANS,
  },
  textPrimary: {
    fontSize: 40,
    color: PRIMARY_COLOR,
    fontFamily: PRO_SANS_BOLD,
  },
  textSecondary: {
    fontSize: 20,
    color: SECONDARY_COLOR,
    fontFamily: PRO_SANS,
    fontWeight: "500",
    marginTop: 10,
  },
});
