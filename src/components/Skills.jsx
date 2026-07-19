import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: -2
  },
  item: {
    width: '33%',
    fontSize: 8.2,
    marginBottom: 1,
    paddingLeft: 3
  },
  bullet: {
    fontSize: 9,
    marginRight: 2
  }
});

export default function Skills({ items = [] }) {
  return (
    <View style={styles.list}>
      {items.map((skill, index) => (
        <Text key={index} style={styles.item}>
          <Text style={styles.bullet}>•</Text> {skill}
        </Text>
      ))}
    </View>
  );
}
