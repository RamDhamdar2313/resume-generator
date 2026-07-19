import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    marginBottom: 6
  },
  degree: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 9,
    color: '#333'
  }
});

export default function Education({ school }) {
  return (
    <View style={styles.container}>
      <Text style={styles.degree}>{school.degree}</Text>
      <Text style={styles.subtitle}>{school.specialization} • {school.institute}</Text>
      <Text style={styles.subtitle}>{school.duration}</Text>
    </View>
  );
}
