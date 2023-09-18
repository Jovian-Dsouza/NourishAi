import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button
} from "react-native";
// import Slider frorm "@react-native-community/slider";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faLeaf,
  faFire,
  faBreadSlice,
  faDrumstickBite,
  faRedo,
  faSave,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./styles";

const ScanResultView = ({ data, onRetake, onAdd }) => {
  const [servingSize, setServingSize] = useState(1);
  return (
    <ScrollView contentContainerStyle={styles.resultContainer}>
      <Image source={{ uri: data.imageURI }} style={styles.imagePreview} />
      {/* <Image src={data.image} style={styles.imagePreview} /> */}

      <Text style={styles.foodName}>{data.name}</Text>
      {/* <Text style={styles.confidence}>Confidence: {data.confidence}%</Text> */}

      {/* <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>
          Serving Size: {servingSize.toFixed(2)}
        </Text>
        <Slider
          value={servingSize}
          onValueChange={(value) => setServingSize(value)}
          minimumValue={0.1}
          maximumValue={5}
          step={0.1}
          thumbTintColor="#FFA500"
          minimumTrackTintColor="#FFA500"
          maximumTrackTintColor="#000000"
        />
      </View> */}

      <View style={styles.card}>
        <Text style={styles.nutritionTitle}>Nutritional Information:</Text>
        <View style={styles.nutritionRow}>
          <FontAwesomeIcon icon={faFire} size={20} />
          <Text style={styles.nutritionItem}>Calories: {data.calories.toFixed(2)} Cal</Text>
        </View>
        <View style={styles.nutritionRow}>
          <FontAwesomeIcon icon={faDrumstickBite} size={20} />
          <Text style={styles.nutritionItem}>Fats: {data.fats.toFixed(2)}g</Text>
        </View>
        <View style={styles.nutritionRow}>
          <FontAwesomeIcon icon={faBreadSlice} size={20} />
          <Text style={styles.nutritionItem}>Carbs: {data.carbs.toFixed(2)}g</Text>
        </View>
        <View style={styles.nutritionRow}>
          <FontAwesomeIcon icon={faLeaf} size={20} />
          <Text style={styles.nutritionItem}>Proteins: {data.proteins.toFixed(2)}g</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={onRetake}
          style={[styles.button, styles.retakeButton]}
        >
          <FontAwesomeIcon icon={faRedo} color="white" size={20} />
          <Text style={styles.buttonText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onAdd}
          style={[styles.button, styles.saveButton]}
        >
          <FontAwesomeIcon icon={faPlus} color="white" size={20} />
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ScanResultView;
