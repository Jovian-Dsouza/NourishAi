import React, { useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  PanResponder,
} from "react-native";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { COLORS } from "../../constants";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

const SlideUpMenu = ({ isVisible, onClose }) => {
  const position = useRef(new Animated.Value(isVisible ? 0 : 350)).current;
  const panResponder = useSlideResponder(position, closeMenu);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: position }] }]}
      {...panResponder.panHandlers}
    >
      <MenuHeader />
      <MealsList />
    </Animated.View>
  );

  function closeMenu() {
    Animated.timing(position, {
      toValue: 350,
      duration: 200,
      useNativeDriver: true,
    }).start(onClose);
  }
};

function useSlideResponder(position, closeMenuCallback) {
  return PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return (gestureState.dx === 0 && gestureState.dy === 0);
    },
    onPanResponderMove: (event, gesture) => {
      if (
        gesture.dy > 0 &&
        position.__getValue() >= -350 &&
        position.__getValue() <= 0
      ) {
        position.setValue(gesture.dy);
      }
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dy > 50) {
        closeMenuCallback();
      } else {
        Animated.spring(position, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });
}

const MenuHeader = () => (
  <View style={styles.headerContainer}>
    <View style={styles.grabber} />
    <Text style={styles.title}>Log</Text>
  </View>
);

const MealsList = () => {
  const navigation = useNavigation();
  const meals = [
    { name: "Breakfast", caloriesLeft: 500 },
    { name: "Snack", caloriesLeft: 200 },
    { name: "Lunch", caloriesLeft: 600 },
    { name: "Dinner", caloriesLeft: 400 },
  ];

  const handleButtonPress = (meal) => {
    navigation.navigate("Food", {mealType: meal.name});
  };

  return (
    <View style={styles.grid}>
      {meals.map((meal, index) => (
        <MealCard
          key={index}
          meal={meal}
          onPress={() => handleButtonPress(meal)}
        />
      ))}
    </View>
  );
};

const MealCard = ({ meal, onPress }) => (
  <View style={styles.card}>
    <TouchableOpacity
      style={styles.addButton}
      onPress={onPress}
    >
      <FontAwesomeIcon icon={faPlus} size={20} color={COLORS.white} />
    </TouchableOpacity>
    <Text style={styles.mealName}>{meal.name}</Text>
    <Text style={styles.calories}>{meal.caloriesLeft} Calories left</Text>
  </View>
);

export default SlideUpMenu;
