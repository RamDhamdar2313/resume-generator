import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    width: '50%',
    fontSize: 9,
    marginBottom: 2
  }
});

export default function Skills({ items }) {
  return (
    <View style={styles.list}>
      {items.map((skill, index) => (
        <Text key={index} style={styles.item}>• {skill}</Text>
      ))}
    </View>
  );
}
