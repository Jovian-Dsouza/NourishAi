import { StyleSheet } from "react-native";
import {COLORS} from '../../constants';


const styles = StyleSheet.create({
  searchWrapper: {
    width: "100%",
    zIndex: 10,
  },
  searchContainer: {
    width: "100%",
  },
  searchInput: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 0,
  },
  suggestionsList: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    maxHeight: 150,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    borderColor: "#eee",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10,
  },

  suggestionItem: {
    backgroundColor: "#ffffff",
    paddingVertical: 12, // Increased vertical padding for more space
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0e0", // Light border color
  },

  suggestionItemPressed: {
    opacity: 0.7,
  },
});

export default styles;
