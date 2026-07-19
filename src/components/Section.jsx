import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    marginBottom: 6
  },
  title: {
    fontSize: 11,
    color: '#3B4CCA',
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'uppercase'
  }
});

export default function Section({ title, children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}
