import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  group: {
    width: '50%',
    marginBottom: 4
  },
  heading: {
    fontSize: 8.7,
    fontWeight: 'bold',
    color: '#3B4CCA',
    marginBottom: 1,
    textTransform: 'capitalize'
  },
  valuesLine: {
    fontSize: 8.5,
    color: '#333',
    lineHeight: 1.35
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
});

function titleCase(str) {
  return String(str)
    .replace(/_/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function Tools({ items = {} }) {
  const entries = Object.entries(items || {});
  if (!entries.length) return null;

  return (
    <View style={styles.row}>
      {entries.map(([category, values]) => (
        <View key={category} style={styles.group}>
          <Text style={styles.heading}>{titleCase(category)}:</Text>
          <Text style={styles.valuesLine}>{(values || []).join(' · ')}</Text>
        </View>
      ))}
    </View>
  );
}
