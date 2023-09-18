import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  scrollContainer: {
    height: '100%',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: 'hidden',
  },
  content: {
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  icon: {
    color: COLORS.orange,
  },
  iconButtonText: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 15,
  },
  iconButton: {
    flexDirection: 'row',
    width: '48%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: COLORS.lightOrange,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  floatingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 50,
    width: '100%',
    borderRadius: 25,
    backgroundColor: 'orange',
    position: 'absolute',
    bottom: 20,
    justifyContent: 'space-between',
    paddingLeft: 40,
  },
  floatingButtonText: {
    color: 'white',
    marginRight: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  itemCount: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  itemCountText: {
    color: 'orange',
  },
});

export default styles;
