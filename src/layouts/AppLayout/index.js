import React from "react";
import { ScrollView, SafeAreaView, StatusBar } from "react-native";
import styles from "./styles";

const AppLayout = ({ children, statusBarColor }) => {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={statusBarColor} />
      {children}
    </SafeAreaView>
  );
};

export default AppLayout;
