import { ref, set, get, push } from "firebase/database";
import { useFirebase } from "./useFirebase";
import DateUtils from "../utils/DateUtils";
import { defaultCalorieRequirement } from "../constants/dummyData";

export const useUsersDatabase = () => {
  const { db } = useFirebase();

  /* User Profile*/
  const setUserProfile = async (
    userId,
    age,
    gender,
    height,
    weight,
    activityLevel = "sedentary",
    dietType = "omnivore",
    allergies = [],
    intolerances = [],
    goalType = "maintenance",
    targetWeight = null
  ) =>
    set(ref(db, `users/${userId}/profile`), {
      age: age,
      gender: gender,
      height: height, // in cm
      weight: weight, // in kg
      activityLevel: activityLevel, // e.g., sedentary, light, moderate, active, very active
      dietType: dietType, // e.g., omnivore, vegetarian, vegan, pescatarian
      allergies: allergies, // an array of allergies
      intolerances: intolerances, // an array of intolerances
      goalType: goalType, // e.g., weight_loss, maintenance, gain, low-carb, high-protein
      targetWeight: targetWeight, // in kg, optional based on the goalType
    });
  const getUserProfile = async (userId) =>
    get(ref(db, `users/${userId}/profile`)).then((snapshot) => snapshot.val());
  const deleteUserProfile = async (userId) =>
    remove(ref(db, `users/${userId}/profile`));

  /* User Calorie Requirements */
  const setUserCalorieRequirements = async (
    userId,
    calories,
    proteins,
    fats,
    carbs
  ) => {
    const requirementsRef = ref(db, `users/${userId}/calorieRequirements`);
    await set(requirementsRef, {
      calories: calories,
      proteins: proteins,
      fats: fats,
      carbs: carbs,
    });
  };

  const getUserCalorieRequirements = async (userId) => {
    const requirementsRef = ref(db, `users/${userId}/calorieRequirements`);
    const data = (await get(requirementsRef)).val();
    return data
      ? data
      : defaultCalorieRequirement;
  };

  /* Helper funcitons */
  const getValue = async (path) => {
    const valRef = ref(db, path);
    const currentVal = (await get(valRef)).val();
    return currentVal ? currentVal : 0;
  };

  const incrementValue = async (path, valueIncrement) => {
    const valRef = ref(db, path);
    const currentVal = (await get(valRef)).val();
    const updateVal = (currentVal ? currentVal : 0) + valueIncrement;
    await set(valRef, updateVal);
    return updateVal;
  };

  /* Daily logging */
  const getCalorieMacrosByDate = async (userId, date, mealType) => {
    const logPath = `users/${userId}/foodLogs/${date}/${mealType}`;
    return {
      calories: await getValue(`${logPath}/calories`),
      proteins: await getValue(`${logPath}/proteins`),
      carbs: await getValue(`${logPath}/carbs`),
      fats: await getValue(`${logPath}/fats`),
    };
  };

  const getFoodLogsByDate = async (userId, date) => {
    const foodLogsRef = ref(db, `users/${userId}/foodLogs/${date}`);
    const foodLogs = (await get(foodLogsRef)).val();
    return foodLogs;
  };

  const logMeal = async (
    userId,
    timestamp,
    mealType,
    foodId,
    foodName,
    calories,
    proteins,
    carbs,
    fats,
    serving,
    pictureURL
  ) => {
    const date = DateUtils.getDateFromTimestamp(timestamp);
    const logPath = `users/${userId}/foodLogs/${date}/${mealType}`;
    const mealRef = push(ref(db, `${logPath}/meals`));

    await set(mealRef, {
      timestamp,
      foodId,
      foodName,
      calories,
      serving,
      pictureURL,
    });
    const updatedCalories = await incrementValue(
      `${logPath}/calories`,
      calories
    );
    const updatedProteins = await incrementValue(
      `${logPath}/proteins`,
      proteins
    );
    const updatedCarbs = await incrementValue(`${logPath}/carbs`, carbs);
    const updatedFats = await incrementValue(`${logPath}/fats`, fats);

    await logFoodToHistory(userId, foodId, foodName, timestamp);

    console.log("updated Calories", updatedCalories);
    console.log("updated Proteins", updatedProteins);
    console.log("updated Carbs", updatedCarbs);
    console.log("updated Fats", updatedFats);
  };

  const logFoodToHistory = async (userId, foodId, foodName, timestamp) => {
    const historyRef = push(ref(db, `users/${userId}/foodHistory`));
    await set(historyRef, {
      foodId,
      foodName,
      timestamp,
    });
  };

  const getRecentlyConsumedFoods = async (userId, limit = 5) => {
    const historyRef = ref(db, `users/${userId}/foodHistory`);
    const snapshot = await get(historyRef.limitToLast(limit));
    const foods = snapshot.val();
    return foods ? Object.values(foods).reverse() : [];
  };

  return {
    setUserProfile,
    getUserProfile,
    deleteUserProfile,
    getCalorieMacrosByDate,
    logMeal,
    getFoodLogsByDate,
    setUserCalorieRequirements,
    getUserCalorieRequirements,
    getRecentlyConsumedFoods,
    // ...
  };
};
