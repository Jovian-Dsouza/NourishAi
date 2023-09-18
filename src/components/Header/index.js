import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEllipsis,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const ProfileLogo = () => (
  <TouchableOpacity>
    <FontAwesomeIcon icon={faUser} />
  </TouchableOpacity>
);

const SettingsLogo = () => (
  <TouchableOpacity>
    <FontAwesomeIcon icon={faEllipsis} />
  </TouchableOpacity>
);

const Header = ({ title, backgroundColor }) => (
  <View style={[styles.header, {backgroundColor: backgroundColor}]}>
    <ProfileLogo />
    <Text style={styles.headerTitle}>{title}</Text>
    <SettingsLogo />
  </View>
);

export default Header;