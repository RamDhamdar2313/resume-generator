import React from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer';
import Header from './components/Header.js';
import Section from './components/Section.js';
import Experience from './components/Experience.js';
import Projects from './components/Projects.js';
import Education from './components/Education.js';
import Skills from './components/Skills.js';
import Tools from './components/Tools.js';
import styles from './styles.js';

const isNonEmpty = (value) =>
  typeof value === 'string'
    ? value.trim().length > 0
    : Array.isArray(value)
      ? value.length > 0
      : false;

const joinOrString = (value) =>
  Array.isArray(value) ? value.join(' · ') : typeof value === 'string' ? value : '';

const normalizeToArray = (value) =>
  Array.isArray(value) ? value : typeof value === 'string' && value.trim() ? [value] : [];

export default function Resume({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header personalInformation={data.personal_information} />

        {data.professional_summary ? (
          <View style={styles.section}>
            <Section title="Professional Summary">
              <Text style={styles.paragraph}>{data.professional_summary}</Text>
            </Section>
          </View>
        ) : null}

        {data.key_skills?.length ? (
          <View style={styles.section}>
            <Section title="Key Skills">
              <Skills items={data.key_skills} />
            </Section>
          </View>
        ) : null}

        {data.tools_technologies && Object.keys(data.tools_technologies).length ? (
          <View style={styles.section}>
            <Section title="Tools & Technologies">
              <Tools items={data.tools_technologies} />
            </Section>
          </View>
        ) : null}

        {data.certifications?.length ? (
          <View style={styles.section}>
            <Section title="Certifications">
              <View style={styles.list}>
                {data.certifications.map((cert, index) => (
                  <Text key={index} style={styles.bullet}>• {cert}</Text>
                ))}
              </View>
            </Section>
          </View>
        ) : null}

        {isNonEmpty(data.languages) ? (
          <View style={styles.section}>
            <Section title="Languages">
              <Text style={styles.paragraph}>{joinOrString(data.languages)}</Text>
            </Section>
          </View>
        ) : null}

        {isNonEmpty(data.interests) || isNonEmpty(data.references) ? (
          <View style={styles.section}>
            {isNonEmpty(data.interests) ? (
              <Section title="Interests">
                <Text style={styles.paragraph}>{joinOrString(data.interests)}</Text>
              </Section>
            ) : null}
            {isNonEmpty(data.references) ? (
              <Section title="References">
                <Text style={styles.paragraph}>{joinOrString(data.references)}</Text>
              </Section>
            ) : null}
          </View>
        ) : null}

        {data.professional_experience?.length ? (
          <View style={styles.section}>
            <Section title="Professional Experience">
              {data.professional_experience.map((item, index) => (
                <Experience key={index} experience={item} />
              ))}
            </Section>
          </View>
        ) : null}

        {data.projects?.length ? (
          <View style={styles.section}>
            <Section title="Projects">
              <Projects items={data.projects} />
            </Section>
          </View>
        ) : null}

        {data.education?.length ? (
          <View style={styles.section}>
            <Section title="Education">
              {data.education.map((school, index) => (
                <Education key={index} school={school} />
              ))}
            </Section>
          </View>
        ) : null}
      </Page>
    </Document>
  );
}
