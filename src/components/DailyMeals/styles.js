import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  dailyMealsContainer: {
    marginTop: 20,
  },
  dailyMealsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.black,
  },
  foodCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  mealTypeTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 10,
  },
  mealTypeText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  foodName: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
  },
  totalKcal: {
    fontSize: 16,
    color: COLORS.gray,
  },
});

export default styles;
