import { Colors } from '@/Theme/Variables';
import { Dimensions, StyleSheet } from 'react-native';

var maxWidth = Dimensions.get('window').width;
var maxHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    boxShadow: '0px 6px 18px 0px rgba(64, 62, 172, 0.16)',
    borderRadius: 15,
    width: maxWidth * 0.8,
    textAlign: 'center',
  },
  onBoardingImage: {
    width: maxWidth,
    borderTopRightRadius: 10,
    marginBottom: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  titleSpan: {
    color: Colors.GREEN,
  },
  subTitle: {
    color: Colors.SUBTITLE,
    textAlign: 'center',
    padding: 30,
    fontSize: 16,
  },
});

export default styles;
