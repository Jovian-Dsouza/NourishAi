import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import AppLayout from "../../layouts/AppLayout";
import { COLORS } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMicrophone, faCamera } from "@fortawesome/free-solid-svg-icons";
import FoodSearchBar from "../../components/FoodSearchBar";
import styles from "./styles";
import Header from "../../components/Header";
import FoodItem from "../../components/FoodItem";
import { useNavigation } from "@react-navigation/native";
import { extractUsefulData } from "../../api/foodApi";

const dummyData = {
  aiScan: [{ id: "0", name: "Burger", kcal: "354", servingSize: "1 piece" }],
  recent: [
    { id: "1", name: "Salad", kcal: "150", servingSize: "1 bowl" },
    { id: "2", name: "Pasta", kcal: "200", servingSize: "1 plate" },
    { id: "3", name: "Pizza", kcal: "200", servingSize: "1 slice" },
    { id: "4", name: "Pizza", kcal: "200", servingSize: "1 slice" },
  ],
};

const ActionButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.iconButton} onPress={onPress}>
    <FontAwesomeIcon icon={icon} size={20} color={COLORS.orange} />
    <Text style={styles.iconButtonText}>{label}</Text>
  </TouchableOpacity>
);

const FoodListSection = ({ title, data, onItemPress }) =>
  data.length > 0 && (
    <View style={styles.foodListContainer}>
      <Text style={styles.listTitle}>{title}</Text>
      {data.map((item) => (
        <FoodItem key={item.id} item={item} onPress={onItemPress} />
      ))}
    </View>
  );


const FloatingButton = ({ mealType, count, onPress }) => (
  <TouchableOpacity style={styles.floatingButton} onPress={onPress}>
    <Text style={styles.floatingButtonText}>Add to {mealType}</Text>
    <View style={styles.itemCount}>
      <Text style={styles.itemCountText}>{count}</Text>
    </View>
  </TouchableOpacity>
);

const Food = ({ route }) => {
  const mealType = route.params?.mealType || "breakfast";
  const scannedFood = route.params?.scannedFood;

  const navigation = useNavigation();
  const [selectedFoods, setSelectedFoods] = useState([]);

  const toggleFoodSelection = (item) => {
    setSelectedFoods((prevSelectedFoods) =>
      prevSelectedFoods.some((food) => food.id === item.id)
        ? prevSelectedFoods.filter((food) => food.id !== item.id)
        : [...prevSelectedFoods, item]
    );
  };

  const handleSuggestionTap = (item) => {
    const food = extractUsefulData(item);
    console.log(food);
  };

  return (
    <AppLayout statusBarColor={COLORS.white}>
      <View style={styles.scrollContainer}>
        <Header title="Food" containerStyle={styles.contentContainer} />
        <View style={styles.container}>
          <FoodSearchBar onSuggestionTap={handleSuggestionTap} />
          <View style={styles.iconContainer}>
            <ActionButton
              icon={faMicrophone}
              label="Voice Search"
              onPress={() => {}}
            />
            <ActionButton
              icon={faCamera}
              label="Scan Food"
              onPress={() => navigation.navigate("Scanner")}
            />
          </View>
          <ScrollView>
            <FoodListSection
              title="Scanned"
              data={scannedFood ? [scannedFood] : []}
              onItemPress={toggleFoodSelection}
            />

            {/* <FoodListSection
              title="Recently Had"
              data={dummyData.recent}
              onItemPress={toggleFoodSelection}
            />
            <View style={{ height: 70 }} /> */}
          </ScrollView>
        </View>
      </View>
      {selectedFoods.length > 0 && (
        <FloatingButton
          mealType={mealType}
          count={selectedFoods.length}
          onPress={() => {}}
        />
      )}
    </AppLayout>
  );
};

export default Food;
