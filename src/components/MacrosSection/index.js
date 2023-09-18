import React from 'react';
import {View, Text} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import {COLORS} from '../../constants';
import styles, {mealStyles} from './styles';
import CircularProgress from 'react-native-circular-progress-indicator';

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

export const MacrosSection = ({
  carbsEaten,
  carbsTotal,
  proteinEaten,
  proteinTotal,
  fatEaten,
  fatTotal,
}) => {
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

////////////////////MEAL///////////////////////////////////////
const MealMacroCard = ({macro, eaten, total, pbColor}) => {
  const left = Math.max(total - eaten, 0);
  const progress = (eaten / total) * 100;

  return (
    <View style={mealStyles.macrosCardSection}>
      <CircularProgress
        value={progress}
        radius={17}
        activeStrokeWidth={6}
        inActiveStrokeWidth={6}
        activeStrokeColor={pbColor}
        inActiveStrokeColor={mealStyles.macroBar.unfilledColor}
        showProgressValue={false}
        progressValueColor={COLORS.black}
      />
      <View style={mealStyles.textSection}>
        <Text style={mealStyles.macrosCardText}>{`${left}g`}</Text>
        <Text style={mealStyles.macrosCardSubText}>{macro}</Text>
      </View>
    </View>
  );
};

export const MealMacrosSection = ({macroData}) => {
  const {
    carbsEaten,
    carbsTotal,
    proteinEaten,
    proteinTotal,
    fatEaten,
    fatTotal,
  } = macroData;

  return (
    <View style={mealStyles.macrosSection}>
      <MealMacroCard
        macro="CARB"
        pbColor={COLORS.bluishGreen}
        eaten={carbsEaten}
        total={carbsTotal}
      />

      <MealMacroCard
        macro="PROTEIN"
        pbColor={COLORS.violet}
        eaten={proteinEaten}
        total={proteinTotal}
      />

      <MealMacroCard
        macro="FAT"
        pbColor={COLORS.darkBlue}
        eaten={fatEaten}
        total={fatTotal}
      />
    </View>
  );
};
