import React from "react";
import { ScrollView, SafeAreaView, StatusBar } from "react-native";
import styles from "./styles";
import AppLayout from "../AppLayout";
import MenuButtons from "../../components/MenuButtons";

const MenuLayout = ({ children, statuBarColor }) => {

  return (
    <AppLayout statuBarColor={statuBarColor}>
      {children}
      <MenuButtons />
    </AppLayout>
  );
};

export default MenuLayout;
