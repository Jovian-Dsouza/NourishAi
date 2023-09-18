import React from "react";
import { View, Text } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUtensils,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import KcalProgressBar from "../KcalProgressBar";
import styles from "./styles";

const CaloriesCardSection = ({ icon, value, subText }) => (
  <View style={styles.caloriesCardSection}>
    <FontAwesomeIcon
      icon={icon}
      style={styles.caloriesCardIcon}
      size={styles.caloriesCardIcon.fontSize}
    />
    <Text style={styles.caloriesCardText}>{value}</Text>
    <Text style={styles.caloriesCardSubText}>{subText}</Text>
  </View>
);

const CaloriesSection = ({ consumedKcal, totalKcal, burnedKcal }) => (
  <View style={styles.caloriesSection}>
    <CaloriesCardSection
      icon={faUtensils}
      value={consumedKcal}
      subText="EATEN"
    />
    <KcalProgressBar consumedKcal={consumedKcal} totalKcal={totalKcal} />
    <CaloriesCardSection icon={faFire} value={burnedKcal} subText="BURNED" />
  </View>
);

export default CaloriesSection;
