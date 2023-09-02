import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../constants/theme";

const colorSelected = (isSelected) => {
  if (isSelected) return { color: COLORS.black };
  return { color: COLORS.lightGray };
};

const DayButton = ({ day, date, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.dayButton, { marginHorizontal: 8 }]}
    onPress={onPress}
  >
    <Text style={[styles.dayButtonText, colorSelected(isSelected)]}>{day}</Text>
    <Text style={[styles.dateText, colorSelected(isSelected)]}>{date}</Text>
    {isSelected && <View style={styles.dot} />}
  </TouchableOpacity>
);

const WeekDaySelector = () => {
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
  const [selectedDayIndex, setSelectedDayIndex] = useState(1); // Default selected day (Tuesday)

  const handleDayPress = (index) => {
    setSelectedDayIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={daysOfWeek}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        contentContainerStyle={styles.flatlistContainer}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <DayButton
            day={item}
            date={(new Date().getDate() + index).toString()}
            isSelected={index === selectedDayIndex}
            onPress={() => handleDayPress(index)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 60,
  },
  flatlistContainer: {
    justifyContent: "space-between",
    width: "100%", // Take the full width
  },
  dayButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  dayButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 12,
  },
  dot: {
    marginTop: 5,
    width: 6,
    height: 6,
    backgroundColor: COLORS.orange, // Use the appropriate orange color
    borderRadius: 3,
  },
});

export default WeekDaySelector;
