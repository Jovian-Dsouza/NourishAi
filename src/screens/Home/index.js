import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import WeekDaySelector from "../../components/WeekDaySelector";
import Header from "../../components/Header";
import CaloriesSection from "../../components/CaloriesSection";
import { MacrosSection } from "../../components/MacrosSection";
import DailyMeals from "../../components/DailyMeals";
import MenuButtons from "../../components/MenuButtons";
import styles from "./styles";
import { defaultCalorieRequirement } from "../../constants/dummyData";
import AppLayout from "../../layouts/AppLayout";
import { COLORS } from "../../constants";
import SlideUpMenu from "../../components/SlideUpMenu";
import { useFirebase } from "../../database/useFirebase";
import { useFoodDatabase } from "../../database/useFoodDatabase";
import { useUsersDatabase } from "../../database/useUsersDatabase";
import DateUtils from "../../utils/DateUtils";

const useFoodLogs = (isDbLoading, date, user) => {
  const { getFoodLogsByDate } = useUsersDatabase();
  const [foodLogs, setFoodLogs] = useState(null);

  const updateFoodLogs = async () => {
    if (isDbLoading) return;
    const logs = await getFoodLogsByDate(user, date);
    setFoodLogs(logs);
  };

  useEffect(() => {
    updateFoodLogs();
  }, [isDbLoading, date, user]);

  return foodLogs;
};

const useCalorieRequirements = (isDbLoading, user) => {
  const { getUserCalorieRequirements } = useUsersDatabase();
  const [calorieRequirements, setCalorieRequirements] = useState(
    defaultCalorieRequirement
  );

  const updateCalorieRequirements = async () => {
    if (isDbLoading) return;
    const data = await getUserCalorieRequirements(user);
    setCalorieRequirements(data);
  };

  useEffect(() => {
    updateCalorieRequirements();
  }, [isDbLoading, user]);

  return calorieRequirements;
};

const calculateConsumed = (foodLogs) => {
  if (!foodLogs) return { calories: 0, carbs: 0, fats: 0, proteins: 0 };

  const consumed = Object.values(foodLogs).reduce(
    (acc, log) => {
      acc.calories += log.calories || 0;
      acc.carbs += log.carbs || 0;
      acc.fats += log.fats || 0;
      acc.proteins += log.proteins || 0;
      return acc;
    },
    { calories: 0, carbs: 0, fats: 0, proteins: 0 }
  );

  return consumed;
};

const calculateDailyMealsData = (foodLogs) => {
  if (!foodLogs) {
    return [];
  }
  return Object.entries(foodLogs).map(([mealType, data]) => {
    const primaryMeal = Object.values(data.meals)[0]; // taking the first meal in this example
    return {
      mealType: mealType.charAt(0).toUpperCase() + mealType.slice(1), // capitalizing the meal type
      foodName: primaryMeal.foodName,
      totalKcal: primaryMeal.calories,
    };
  });
};

const Home = () => {
  const { isLoading: isDbLoading } = useFirebase();

  const [menuVisible, setMenuVisible] = useState(false);
  const [date, setDate] = useState(DateUtils.getDateFromTimestamp(new Date()));
  const [user, setUser] = useState(1); //TODO get form login

  const foodLogs = useFoodLogs(isDbLoading, date, user);
  const consumed = useMemo(() => calculateConsumed(foodLogs), [foodLogs]);
  const dailyMealsData = useMemo(
    () => calculateDailyMealsData(foodLogs),
    [foodLogs]
  );
  const calorieRequirements = useCalorieRequirements(isDbLoading, user);
  const burnedCalories = 0; //TODO get from database

  const handleDateChange = (newDate) => {
    setDate(DateUtils.getDateFromTimestamp(newDate));
  };

  // useEffect(() => {
  //   console.log("calorieRequirements", calorieRequirements);
  // }, [calorieRequirements]);

  return (
    <AppLayout
      statusBarColor={menuVisible ? "rgba(0,0,0,0.7)" : COLORS.lightGreen}
    >
      {menuVisible && <Overlay onPress={() => setMenuVisible(false)} />}
      {menuVisible && (
        <SlideUpMenu
          isVisible={menuVisible}
          onClose={() => setMenuVisible(false)}
        />
      )}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Header title="Home" />
          <WeekDaySelector onDateChange={handleDateChange} />
          <CaloriesSection
            consumedKcal={consumed.calories}
            totalKcal={calorieRequirements.calories}
            burnedKcal={burnedCalories}
          />
          <MacrosSection
            carbsEaten={consumed.carbs}
            carbsTotal={calorieRequirements.carbs}
            proteinEaten={consumed.proteins}
            proteinTotal={calorieRequirements.proteins}
            fatEaten={consumed.fats}
            fatTotal={calorieRequirements.fats}
          />
        </View>

        {/* Daily meals */}
        <View style={styles.content}>
          <DailyMeals foodData={dailyMealsData} />
        </View>
      </ScrollView>
      <MenuButtons onAdd={() => setMenuVisible(true)} />
    </AppLayout>
  );
};

const Overlay = ({ onPress }) => (
  <TouchableOpacity
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.65)", // semi-transparent black
      zIndex: 5, // ensure it's below the SlideUpMenu but above other content
    }}
    onPress={onPress}
  />
);

export default Home;
