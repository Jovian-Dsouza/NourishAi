import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

import Header from "../../components/Header";
import KcalProgressBar from "../../components/KcalProgressBar";
import { MealMacrosSection } from "../../components/MacrosSection";
import DailyMeals from "../../components/DailyMeals";
import AppLayout from "../../layouts/AppLayout";
import {
  consumedKcal,
  totalKcal,
  macroData,
  foodData,
} from "../../constants/dummyData";
import { COLORS } from "../../constants";

const MealHeader = () => (
  <View style={styles.contentContainer}>
    <Header title="" />
    <Text style={styles.lunchTitle}>Lunch</Text>
    <Text style={styles.recommendedPortion}>
      Recommended portion: 450-500 kcal
    </Text>
    <View style={styles.calorieMealContainer}>
      <KcalProgressBar consumedKcal={consumedKcal} totalKcal={totalKcal} />
      <MealMacrosSection macroData={macroData} />
    </View>
  </View>
);

const Meal = () => (
  <AppLayout statuBarColor={COLORS.lightGreen}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <MealHeader />
      <View style={styles.content}>
        <DailyMeals foodData={foodData} />
      </View>
    </ScrollView>
  </AppLayout>
);

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.lightGreen,
  },
  contentContainer: {
    backgroundColor: COLORS.lightGreen, // Assuming you have this color defined
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  lunchTitle: {
    fontSize: 40,
    fontWeight: "500",
    color: COLORS.black, // Assuming you have this color defined
    marginBottom: 8,
  },
  recommendedPortion: {
    fontSize: 18,
    color: COLORS.lightGray, // Assuming you have this color defined
    marginBottom: 15,
  },
  calorieMealContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "white",
  },
});

export default Meal;
