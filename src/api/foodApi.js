import { edamamConfig } from "../config";

const fetchFoodSuggestions = async query => {
  try {
    const response = await fetch(
      `${edamamConfig.endpoint}?ingr=${query}&app_id=${edamamConfig.id}&app_key=${edamamConfig.key}`,
    );
    const data = await response.json();
    return data.hints ? data.hints : [];
  } catch (error) {
    console.error('Failed to fetch suggestions:', error);
    throw error;
  }
};

const extractUsefulData = item => {
  if (!item) {
    return null;
  }
  return {
    id: item.food.foodId,
    name: item.food.label,
    image: item.food.image,
    calories: item.food.nutrients.ENERC_KCAL,
    fats: item.food.nutrients.FAT,
    proteins: item.food.nutrients.PROCNT,
    carbs: item.food.nutrients.CHOCDF,
    servingSize: '1 unit',
  };
};

export {fetchFoodSuggestions, extractUsefulData};
