import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-community/picker";
import {customFonts} from "../constants"
const { PRO_SANS } = customFonts;

const UnitsPicker = ({ unitsSystem, setUnitsSystem }) => {
  return (
    <View style={styles.units}>
      <Picker
        selectedValue={unitsSystem}
        onValueChange={(value) => setUnitsSystem(value)}
        mode="dropdown"
        itemStyle={styles.itemStyle}
      >
        <Picker.Item label="C°" value="metric" />
        <Picker.Item label="F°" value="imperial" />
      </Picker>
    </View>
  );
};

export default UnitsPicker;

const styles = StyleSheet.create({
  units: {
    position: "absolute",
    height: 50,
    ...Platform.select({
      ios: {
        top: -20,
      },
      android: {
        top: 20,
      },
    }),
    width: 50,
  },
  itemStyle: {
    fontSize: 14,
    fontFamily: PRO_SANS,
  },
});
