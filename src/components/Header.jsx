import React from 'react';
import { View, Text, StyleSheet, Link, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    marginBottom: 12
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2
  },
  title: {
    fontSize: 11,
    color: '#3B4CCA',
    marginBottom: 6
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 9,
    color: '#333',
    lineHeight: 1.3,
    marginBottom: 2
  },
  contactItem: {
    marginRight: 10
  },
  contactItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8
  },
  contactIcon: {
    width: 9,
    height: 9,
    marginRight: 4,
    opacity: 0.65
  },
  contactText: {
    fontSize: 8.5,
    color: '#333'
  },
  linkRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    textDecoration: 'none'
  },
  iconImage: {
    width: 9,
    height: 9,
    marginRight: 4,
    opacity: 0.65
  },
  linkText: {
    fontSize: 8.2,
    color: '#3B4CCA',
    marginLeft: 0
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#3B4CCA',
    marginBottom: 12,
    marginTop: 4
  }
});

function renderContactItem(text) {
  return text ? (
    <Text key={text} style={styles.contactItem}>{text}</Text>
  ) : null;
}

function renderContactItemWithIcon(value, icon) {
  if (!value) return null;
  const isDataUri = typeof icon === 'string' && icon.startsWith('data:image');
  return (
    <View key={value} style={styles.contactItemRow}>
      {isDataUri ? <Image src={icon} style={styles.contactIcon} /> : null}
      <Text style={styles.contactText}>{value}</Text>
    </View>
  );
}

function formatLink(linkValue) {
  if (!linkValue) return null;
  if (typeof linkValue === 'string') {
    return { url: linkValue.trim(), text: linkValue.trim(), icon: undefined };
  }
  if (typeof linkValue === 'object' && linkValue.url) {
    return { url: linkValue.url, text: linkValue.text || linkValue.url, icon: linkValue.icon };
  }
  return null;
}

function renderLink(linkObj, fallbackIcon, badgeColor) {
  const { url, text, icon } = linkObj || {};
  if (!url) return null;

  // choose the actual icon source: prefer provided data URI (`icon`),
  // otherwise fallback to the short badge string.
  const actualIcon = icon || fallbackIcon;

  const isDataUri = typeof actualIcon === 'string' && actualIcon.startsWith('data:image');

  return (
    <Link key={url} src={url} style={styles.linkItem}>
      {isDataUri ? (
        <Image src={actualIcon} style={styles.iconImage} />
      ) : (
        // if not a data URI, render a small text badge (no file fetch)
        <Text style={[styles.linkText, { color: badgeColor, fontWeight: 'bold', opacity: 0.9, marginRight: 4 }]}>
          {fallbackIcon}
        </Text>
      )}
      <Text style={styles.linkText}>{text}</Text>
    </Link>
  );
}

export default function Header({ personalInformation = {} }) {
  const contactParts = [
    renderContactItemWithIcon(personalInformation.location, personalInformation.location_icon),
    renderContactItemWithIcon(personalInformation.phone, personalInformation.phone_icon),
    renderContactItem(personalInformation.email)
  ];

  const linkedin = formatLink(personalInformation.linkedin);
  const github = formatLink(personalInformation.github);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{personalInformation.full_name || 'Your Name'}</Text>
      <Text style={styles.title}>{personalInformation.title || 'Professional Title'}</Text>
      <View style={styles.contactRow}>{contactParts}</View>
      {(linkedin || github) ? (
        <View style={styles.linkRow}>
          {linkedin ? renderLink(linkedin, 'in', '#0077B5') : null}
          {github ? renderLink(github, 'GH', '#24292F') : null}
        </View>
      ) : null}
      <View style={styles.divider} />
    </View>
  );
}
