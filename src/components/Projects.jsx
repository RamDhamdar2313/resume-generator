import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  item: {
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

export default function Projects({ items }) {
  return (
    <View>
      {items.map((project, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.title}>{project.title}</Text>
          <Text style={styles.duration}>{project.duration}</Text>
          {project.achievements?.map((achievement, idx) => (
            <Text key={idx} style={styles.bullet}>• {achievement}</Text>
          ))}
        </View>
      ))}
    </View>
  );
}
