import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  caloriesSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  caloriesCardSection: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  caloriesCardIcon: {
    fontSize: 20,
    color: COLORS.orange,
  },
  caloriesCardText: {
    color: COLORS.black,
    fontSize: 23,
    fontWeight: "500",
  },
  caloriesCardSubText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "gray",
  },

});

export default styles;
