const COLORS = {
  white: "#FFFFFF",
  lightGreen: "#D8FFB0",
  darkGreen: "#6C8357",

  bluishGreen: "#188D85",
  violet: "#B043FF",
  darkBlue: "#1D60DD",

  lightGray: "#95B576",
  orange: "#FA8539",
  black: "#000000",
  gray: "#B6B6B6",
  inActiveStroke: "#C3EEA6",
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
