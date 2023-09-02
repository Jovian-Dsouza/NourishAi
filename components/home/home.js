import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEllipsis,
  faUser,
  faUtensils,
  faFire,
} from '@fortawesome/free-solid-svg-icons';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import WeekDaySelector from './WeekDaySelector';
import KcalProgressBar from './KcalProgressBar';
import styles from './home.style';
import ProgressBar from 'react-native-progress/Bar';
import {COLORS} from '../../constants/theme';
import FooterMenu from '../common/FooterMenu';
import {createStackNavigator} from '@react-navigation/stack';

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

const Header = () => (
  <View style={styles.header}>
    <ProfileLogo />
    <Text style={styles.headerTitle}>Home</Text>
    <SettingsLogo />
  </View>
);

const CaloriesCardSection = ({icon, value, subText}) => (
  <View style={styles.caloriesCardSection}>
    <FontAwesomeIcon
      icon={icon}
      style={styles.caloriesCardIcon}
      size={styles.caloriesCardIcon.fontSize}
    />
    <Text style={styles.caloriesCardText}>{value}</Text>
    <Text style={styles.caloriesCardSubText}>{subText}</Text>
  </View>
);

const CaloriesSection = ({consumedKcal, totalKcal, burnedKcal}) => (
  <View style={styles.caloriesSection}>
    <CaloriesCardSection
      icon={faUtensils}
      value={consumedKcal}
      subText="EATEN"
    />
    <KcalProgressBar consumedKcal={consumedKcal} totalKcal={totalKcal} />
    <CaloriesCardSection icon={faFire} value={burnedKcal} subText="BURNED" />
  </View>
);

const MacrosCardSection = ({macro, eaten, total, pbColor}) => {
  const left = Math.max(total - eaten, 0);
  const progress = eaten / total;

  return (
    <View style={styles.macrosCardSection}>
      <ProgressBar
        progress={progress}
        width={styles.macroBar.width} // Set the width of the progress bar
        height={styles.macroBar.height} // Set the height of the progress bar
        borderRadius={styles.macroBar.borderRadius} // Set the border radius of the progress bar
        color={pbColor} // Set the color of the filled part of the progress bar
        unfilledColor={styles.macroBar.unfilledColor} // Set the color of the unfilled part of the progress bar
        borderWidth={styles.macroBar.borderWidth} // Set the width of the border of the progress bar
      />
      <Text style={styles.macrosCardSubText}>{macro}</Text>
      <Text style={styles.macrosCardText}>{`${left}g left`}</Text>
    </View>
  );
};

const MacrosSection = ({macroData}) => {
  const {
    carbsEaten,
    carbsTotal,
    proteinEaten,
    proteinTotal,
    fatEaten,
    fatTotal,
  } = macroData;

  return (
    <View style={styles.macrosSection}>
      <MacrosCardSection
        macro="CARB"
        pbColor={COLORS.bluishGreen}
        eaten={carbsEaten}
        total={carbsTotal}
      />

      <MacrosCardSection
        macro="PROTEIN"
        pbColor={COLORS.violet}
        eaten={proteinEaten}
        total={proteinTotal}
      />

      <MacrosCardSection
        macro="FAT"
        pbColor={COLORS.darkBlue}
        eaten={fatEaten}
        total={fatTotal}
      />
    </View>
  );
};

const FoodCard = ({mealType, foodName, totalKcal}) => (
  <View style={styles.foodCard}>
    <View style={[styles.mealTypeTag, {backgroundColor: COLORS.orange}]}>
      <Text style={styles.mealTypeText}>{mealType}</Text>
    </View>
    <Text style={styles.foodName}>{foodName}</Text>
    <Text style={styles.totalKcal}>{`${totalKcal} Kcal`}</Text>
  </View>
);

const DailyMeals = () => {
  const foodData = [
    {mealType: 'Breakfast', foodName: 'Oatmeal', totalKcal: 250},
    {mealType: 'Lunch', foodName: 'Grilled Chicken Salad', totalKcal: 350},
    {mealType: 'Dinner', foodName: 'Salmon with Veggies', totalKcal: 400},
  ];

  return (
    <View style={styles.dailyMealsContainer}>
      <Text style={styles.dailyMealsTitle}>Daily Meals</Text>
      {foodData.map((food, index) => (
        <FoodCard
          key={index}
          mealType={food.mealType}
          foodName={food.foodName}
          totalKcal={food.totalKcal}
        />
      ))}
    </View>
  );
};

const NourishAIHome = () => {
  const Stack = createStackNavigator();

  const consumedKcal = 2500;
  const totalKcal = 3000;
  const burnedKcal = 350;

  const macroData = {
    carbsEaten: 150,
    carbsTotal: 290,
    proteinEaten: 80,
    proteinTotal: 150,
    fatEaten: 75,
    fatTotal: 85,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={styles.container.backgroundColor} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Header />
          <WeekDaySelector />
          <CaloriesSection
            consumedKcal={consumedKcal}
            totalKcal={totalKcal}
            burnedKcal={burnedKcal}
          />
          <MacrosSection macroData={macroData} />
        </View>

        {/* Daily meals */}
        <View style={styles.content}>
          {/* <Text>My meals eat 123</Text> */}
          <DailyMeals />
        </View>
      </ScrollView>
      <FooterMenu />
    </SafeAreaView>
  );
};

export default NourishAIHome;
