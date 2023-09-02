import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
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


const FooterButton = ({ icon, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.footerButton, isActive && styles.activeButton]}
    onPress={onPress}
  >
    <FontAwesomeIcon
      icon={icon}
      size={22}
      color={isActive ? COLORS.orange : COLORS.gray}
    />
  </TouchableOpacity>
);

const AddButton = ({ icon }) => (
  <TouchableOpacity style={styles.addFoodButton}>
    <FontAwesomeIcon icon={icon} size={24} color={COLORS.white} />
  </TouchableOpacity>
);

const FooterButtons = () => {
  const [activeButton, setActiveButton] = useState("menu"); // Initial active button

  const handleButtonPress = (button) => {
    setActiveButton(button);
  };

  return (
    <View style={styles.container}>
      <Shadow style={styles.shadow} distance={3}>
        <View style={styles.footerContainer}>
          <FooterButton
            icon={faBars}
            isActive={activeButton === "menu"}
            onPress={() => handleButtonPress("menu")}
          />
          <FooterButton
            icon={faUtensils}
            isActive={activeButton === "food"}
            onPress={() => handleButtonPress("food")}
          />
          <AddButton icon={faPlus} />
          <FooterButton
            icon={faFire}
            isActive={activeButton === "burned"}
            onPress={() => handleButtonPress("burned")}
          />
          <FooterButton
            icon={faCamera}
            isActive={activeButton === "scan"}
            onPress={() => handleButtonPress("scan")}
          />
        </View>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  shadow: {
    width: "100%",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.white,
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  footerButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "20%", // Equal width for all buttons
  },
  dot: {
    marginTop: 5,
    width: 6,
    height: 6,
    backgroundColor: COLORS.orange, // Use the appropriate orange color
    borderRadius: 3,
  },
  addFoodButton: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.orange,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FooterButtons;
