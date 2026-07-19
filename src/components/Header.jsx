import React from 'react';
import { View, Text, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    marginBottom: 12
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2
  },
  title: {
    fontSize: 11,
    color: '#3B4CCA',
    marginBottom: 6
  },
  contact: {
    fontSize: 9,
    color: '#333',
    lineHeight: 1.4
  }
});

export default function Header({ personalInformation, summary }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{personalInformation.full_name}</Text>
      <Text style={styles.title}>{personalInformation.title}</Text>
      <Text style={styles.contact}>
        {personalInformation.location} • {personalInformation.phone} • {personalInformation.email}
      </Text>
      {personalInformation.linkedin?.url ? (
        <Text style={styles.contact}>
          <Link src={personalInformation.linkedin.url}>{personalInformation.linkedin.text}</Link>
        </Text>
      ) : null}
      <Text style={[styles.contact, { marginTop: 8 }]}>{summary}</Text>
    </View>
  );
}
