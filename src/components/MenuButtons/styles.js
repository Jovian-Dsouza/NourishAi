import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
  },
  shadow: {
    width: '100%',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.white,
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  menuButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%', // Equal width for all buttons
  },
  dot: {
    marginTop: 5,
    width: 6,
    height: 6,
    backgroundColor: COLORS.orange, // Use the appropriate orange color
    borderRadius: 3,
  },
  addFoodButton: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.orange,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
