import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { CircularProgressBase } from "react-native-circular-progress-indicator";
import { COLORS } from "../../src/constants/theme";

const KcalProgressBar = ({ consumedKcal, totalKcal }) => {
  const kcalLeft = totalKcal - consumedKcal;
  const progress = (consumedKcal / totalKcal) * 100;

  return (
    <View style={styles.container}>
      <CircularProgressBase
        value={progress}
        radius={80}
        activeStrokeWidth={22}
        inActiveStrokeWidth={22}
        activeStrokeColor={COLORS.orange}
        activeStrokeSecondaryColor={"#C94F00"}
        inActiveStrokeColor={COLORS.inActiveStroke}
        showProgressValue={false}
        progressValueColor={COLORS.black}
        circleBackgroundColor={COLORS.white}
      >
        <View style={styles.innerContainer}>
          <FontAwesomeIcon
            icon={faBolt}
            style={styles.icon}
            size={styles.icon.fontSize}
          />
          <Text style={styles.kcalLeft}>{kcalLeft}</Text>
          <Text style={styles.text}>KCAL LEFT</Text>
        </View>
      </CircularProgressBase>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    alignItems: "center",
  },
  icon: {
    fontSize: 23,
    color: COLORS.orange,
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#C2C2C2",
  },
  kcalLeft: {
    fontSize: 30,
    fontWeight: "500",
  },
});

export default KcalProgressBar;
