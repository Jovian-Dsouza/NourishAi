import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const styles = StyleSheet.create({
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
});

export const mealStyles = StyleSheet.create({
  macrosSection: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  macrosCardSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },
  textSection: {
    marginLeft: 15,
  },
  macrosCardSubText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'gray',
  },
  macrosCardText: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 20,
    fontWeight: '500',
  },
  macroBar: {
    unfilledColor: COLORS.inActiveStroke,
  },
  icon: {
    fontSize: 20, // Adjust as necessary
    color: COLORS.black,
  },
});

export default styles;
