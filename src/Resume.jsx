import React from 'react';
import { Document, Page, View } from '@react-pdf/renderer';
import Header from './components/Header.js';
import Section from './components/Section.js';
import Experience from './components/Experience.js';
import Projects from './components/Projects.js';
import Education from './components/Education.js';
import Skills from './components/Skills.js';
import Tools from './components/Tools.js';
import styles from './styles.js';

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
