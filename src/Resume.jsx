import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import Header from './components/Header';
import Section from './components/Section';
import Experience from './components/Experience';
import Project from './components/Project';
import Education from './components/Education';
import Skills from './components/Skills';
import Tools from './components/Tools';

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 10,
    fontFamily: 'Helvetica'
  },
  section: {
    marginBottom: 10
  }
});

export default function Resume({ data }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header personalInformation={data.personal_information} summary={data.professional_summary} />

        <View style={styles.section}>
          <Section title="Key Skills">
            <Skills items={data.key_skills || []} />
          </Section>
        </View>

        <View style={styles.section}>
          <Section title="Tools & Technologies">
            <Tools items={data.tools_technologies || {}} />
          </Section>
        </View>

        <View style={styles.section}>
          <Section title="Professional Experience">
            {data.professional_experience?.map((item, index) => (
              <Experience key={index} experience={item} />
            ))}
          </Section>
        </View>

        {data.projects?.length ? (
          <View style={styles.section}>
            <Section title="Projects">
              {data.projects.map((project, index) => (
                <Project key={index} project={project} />
              ))}
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
