import React from "react";
import { View, Text } from "react-native";
import { COLORS } from "../../constants";
import styles from "./styles";

const FoodCard = ({ mealType, foodName, totalKcal }) => (
  <View style={styles.foodCard}>
    <View style={[styles.mealTypeTag, { backgroundColor: COLORS.orange }]}>
      <Text style={styles.mealTypeText}>{mealType}</Text>
    </View>
    <Text style={styles.foodName}>{foodName}</Text>
    <Text style={styles.totalKcal}>{`${totalKcal} Kcal`}</Text>
  </View>
);

const DailyMeals = ({ foodData }) => {
  return (
    <View style={styles.dailyMealsContainer}>
      {foodData.length > 0 && (
        <Text style={styles.dailyMealsTitle}>Daily Meals</Text>
      )}
      {foodData.map((food, index) => (
        <FoodCard
          key={index}
          mealType={food.mealType}
          foodName={food.foodName}
          totalKcal={food.totalKcal}
        />
      ))}
    </View>
  );
};

export default DailyMeals;