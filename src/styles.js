import { StyleSheet } from '@react-pdf/renderer';

export default StyleSheet.create({
  page: {
    padding: 18,
    fontSize: 10,
    fontFamily: 'Helvetica'
  },
  section: {
    marginBottom: 8
  },
  paragraph: {
    fontSize: 8.7,
    color: '#333',
    lineHeight: 1.35
  },
  smallText: {
    fontSize: 8.7,
    color: '#333'
  },
  compactList: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  compactItem: {
    width: '33%',
    fontSize: 8.5,
    marginBottom: 2
  }
});
