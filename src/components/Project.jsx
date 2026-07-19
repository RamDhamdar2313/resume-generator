import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    marginBottom: 6
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  duration: {
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

export default function Project({ project }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{project.title}</Text>
      <Text style={styles.duration}>{project.duration}</Text>
      {project.achievements?.map((item, index) => (
        <Text key={index} style={styles.bullet}>• {item}</Text>
      ))}
    </View>
  );
}
