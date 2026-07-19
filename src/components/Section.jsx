import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  title: {
    fontSize: 11,
    color: '#3B4CCA',
    fontWeight: 'bold',
    marginBottom: 4,
    textTransform: 'uppercase'
  },
  underline: {
    height: 1,
    backgroundColor: '#3B4CCA',
    width: '15%',
    marginBottom: 6
  }
});

export default function Section({ title, children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.underline} />
      {children}
    </View>
  );
}
