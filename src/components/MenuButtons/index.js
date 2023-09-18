import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBars,
  faUtensils,
  faPlus,
  faFire,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { Shadow } from "react-native-shadow-2";
import { COLORS } from "../../constants/theme";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import SlideUpMenu from "../SlideUpMenu";

const MenuButton = ({ icon, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.menuButton, isActive && styles.activeButton]}
    onPress={onPress}
  >
    <FontAwesomeIcon
      icon={icon}
      size={22}
      color={isActive ? COLORS.orange : COLORS.gray}
    />
  </TouchableOpacity>
);

const AddButton = ({ icon, onPress }) => (
  <TouchableOpacity style={styles.addFoodButton} onPress={onPress}>
    <FontAwesomeIcon icon={icon} size={24} color={COLORS.white} />
  </TouchableOpacity>
);

const MenuButtons = ({ onAdd }) => {
  const [activeButton, setActiveButton] = useState("menu"); // Initial active button
  const navigation = useNavigation();

  const handleButtonPress = (button) => {
    // setActiveButton(button);
    if (button === "scan") {
      navigation.navigate("Scanner");
    }
    if (button === "menu") {
      navigation.navigate("Home");
    }
    if (button === "food") {
      navigation.navigate("Food");
    }
    if (button === "add") {
      onAdd();
    }
  };

  return (
    <View style={styles.container}>
      <Shadow style={styles.shadow} distance={3}>
        <View style={styles.menuContainer}>
          <MenuButton
            icon={faBars}
            isActive={activeButton === "menu"}
            onPress={() => handleButtonPress("menu")}
          />
          <MenuButton
            icon={faUtensils}
            isActive={activeButton === "food"}
            onPress={() => handleButtonPress("food")}
          />
          <AddButton icon={faPlus} onPress={() => handleButtonPress("add")} />
          <MenuButton
            icon={faFire}
            isActive={activeButton === "burned"}
            onPress={() => handleButtonPress("burned")}
          />
          <MenuButton
            icon={faCamera}
            isActive={activeButton === "scan"}
            onPress={() => handleButtonPress("scan")}
          />
        </View>
      </Shadow>
    </View>
  );
};

export default MenuButtons;
