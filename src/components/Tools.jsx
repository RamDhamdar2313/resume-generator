import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  group: {
    marginBottom: 4
  },
  heading: {
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 2
  },
  item: {
    fontSize: 9,
    marginBottom: 1
  }
});

export default function Tools({ items }) {
  return (
    <View>
      {Object.entries(items).map(([category, values]) => (
        <View key={category} style={styles.group}>
          <Text style={styles.heading}>{category.replace(/_/g, ' ')}</Text>
          {values.map((tool, index) => (
            <Text key={index} style={styles.item}>• {tool}</Text>
          ))}
        </View>
      ))}
    </View>
  );
}
