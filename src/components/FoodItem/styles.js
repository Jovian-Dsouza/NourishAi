import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  foodItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 1,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  iconPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ebebeb",
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  foodDetail: {
    fontSize: 14,
    color: "#555",
  },
});

export default styles;