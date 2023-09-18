import {
  StyleSheet,
} from "react-native";
import { COLORS } from "../../constants";


const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 350,
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    zIndex: 10,
    padding: 20,
  },
  headerContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  grabber: {
    width: 40, // Width of the grabber
    height: 5, // Height of the grabber
    borderRadius: 2.5, // Makes the grabber rounded
    backgroundColor: "#B8B8B8", // Color of the grabber
    marginBottom: 10, // Space between grabber and the "Log" text
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    height: 100,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: COLORS.orange,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  mealName: {
    fontSize: 18,
  },
  calories: {
    fontSize: 12,
    color: "gray",
  },
});

export default styles;
