import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../src/constants/theme";

const colorSelected = (isSelected) => ({
  color: isSelected ? COLORS.black : COLORS.lightGray,
});

const DayButton = ({ day, date, isSelected, onPress, isDisabled }) => (
  <TouchableOpacity
    style={[styles.dayButton, isDisabled && styles.disabledButton]}
    onPress={onPress}
    disabled={isDisabled}
  >
    <Text style={[styles.dayButtonText, colorSelected(isSelected)]}>{day}</Text>
    <Text style={[styles.dateText, colorSelected(isSelected)]}>{date}</Text>
    {isSelected && <View style={styles.dot} />}
  </TouchableOpacity>
);

const getWeekDates = (currentDate) => {
  const sundayDate = new Date(currentDate);
  sundayDate.setDate(currentDate.getDate() - currentDate.getDay());

  return Array(7)
    .fill(null)
    .map((_, i) => {
      const nextDate = new Date(sundayDate);
      nextDate.setDate(sundayDate.getDate() + i);
      return nextDate;
    });
};

const WeekDaySelector = ({ onDateChange }) => {
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
  const [selectedDayIndex, setSelectedDayIndex] = useState(new Date().getDay());

  const currentDate = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  }, []);

  const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate]);

  const handleButtonPress = useCallback(
    (index) => {
      const selectedDate = new Date(weekDates[index]);
      if (selectedDate <= currentDate) {
        selectedDate.setDate(selectedDate.getDate() + 1);
        setSelectedDayIndex(index);
        onDateChange(selectedDate);
      }
    },
    [currentDate, onDateChange, weekDates]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={daysOfWeek}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        contentContainerStyle={styles.flatlistContainer}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <DayButton
            day={item}
            date={weekDates[index].getDate()}
            isSelected={index === selectedDayIndex}
            onPress={() => handleButtonPress(index)}
            isDisabled={weekDates[index] > currentDate}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatlistContainer: {
    justifyContent: "space-between",
    width: "100%",
  },
  dayButton: {
    alignItems: "center",
    paddingVertical: 8,
    marginHorizontal: 8,
    width: 30,
  },
  disabledButton: {
    opacity: 0.6,
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
    backgroundColor: COLORS.orange,
    borderRadius: 3,
  },
});

export default WeekDaySelector;
