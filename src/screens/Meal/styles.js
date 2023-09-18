import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGreen,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.lightGreen,
  },
  contentContainer: {
    backgroundColor: COLORS.lightGreen,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: 'white',
  },
  caloriesSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  caloriesCardSection: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caloriesCardIcon: {
    fontSize: 20,
    color: COLORS.orange,
  },
  caloriesCardText: {
    color: COLORS.black,
    fontSize: 23,
    fontWeight: '500',
  },
  caloriesCardSubText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'gray',
  },

  macrosSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  macrosCardSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  macrosCardSubText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'gray',
    marginTop: 10,
  },
  macrosCardText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '500',
  },
  macroBar: {
    width: 60,
    height: 5,
    borderRadius: 5,
    borderWidth: 0,
    unfilledColor: COLORS.inActiveStroke,
  },

  dailyMealsContainer: {
    marginTop: 20,
  },
  dailyMealsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.black,
  },
  foodCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontWeight: 'bold',
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
