import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    marginBottom: 6
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 9,
    color: '#333',
    marginBottom: 2
  },
  bullet: {
    fontSize: 9,
    marginLeft: 6,
    marginBottom: 2
  }
});

export default function Experience({ experience }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{experience.company}</Text>
        <Text style={styles.subtitle}>{experience.duration}</Text>
      </View>
      <Text style={styles.subtitle}>{experience.location}</Text>
      {experience.responsibilities?.map((item, index) => (
        <Text key={index} style={styles.bullet}>• {item}</Text>
      ))}
    </View>
  );
}
