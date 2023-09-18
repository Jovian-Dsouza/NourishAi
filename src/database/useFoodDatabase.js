import { ref, push, set, get } from "firebase/database";
import { useFirebase } from "./useFirebase";

export const useFoodDatabase = () => {
  const { db } = useFirebase();

  const addFood = async (name, totalKcal, macronutrients, pictureURL) => {
    const newFoodRef = push(ref(db, "Foods"));
    await set(newFoodRef, { name, totalKcal, macronutrients, pictureURL });
    return newFoodRef.key;
  };

  const getFoodById = async (foodId) => {
    const foodRef = ref(db, `Foods/${foodId}`);
    const snapshot = await get(foodRef);
    return snapshot.val();
  };

  return {
    addFood,
    getFoodById,
  };
};
