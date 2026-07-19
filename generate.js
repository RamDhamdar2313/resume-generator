import path from 'path';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import React from 'react';
import * as ReactPDF from '@react-pdf/renderer';
import Resume from './dist/Resume.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, 'data');
const outputDir = path.resolve(__dirname, 'output');
const resumeDataPath = path.join(dataDir, 'resume.yml');
const rootResumePath = path.join(__dirname, 'resume.yml');
const outputPath = path.join(outputDir, 'resume.pdf');
const tempOutputPath = path.join(outputDir, 'resume.tmp.pdf');

const defaultResume = `personal_information:
  full_name: "Your Name"
  title: "Role | Skills"
  phone: "+1 (555) 555-5555"
  email: "you@example.com"
  location: "City, Country"
  linkedin:
    text: "LinkedIn Profile"
    url: "https://linkedin.com/in/yourprofile"

professional_summary: >
  Proven professional with experience building modern cloud-native platforms.

key_skills:
  - Cloud Infrastructure
  - CI/CD Automation
  - Kubernetes
  - Infrastructure as Code

tools_technologies:
  cloud:
    - AWS
    - GCP
    - Azure
  containers:
    - Docker
    - Kubernetes
    - Helm
  infrastructure_as_code:
    - Terraform
    - Ansible
  cicd:
    - GitHub Actions
    - Jenkins
  observability:
    - Prometheus
    - Grafana
  programming:
    - JavaScript
    - Python
    - Bash
  operating_systems:
    - Linux
  version_control:
    - Git
    - GitHub
  databases:
    - PostgreSQL
    - MySQL

professional_experience:
  - company: "Example Company"
    location: "Remote"
    duration: "2025 – Present"
    responsibilities:
      - "Designed and automated infrastructure using Terraform and CI/CD pipelines."
      - "Managed containerized applications on Kubernetes clusters."

projects:
  - title: "Resume PDF Generator"
    duration: "2025"
    achievements:
      - "Built a resume generator using React PDF and YAML input."

education:
  - degree: "Bachelor of Science"
    specialization: "Computer Science"
    institute: "University Name"
    duration: "2021 – 2025"

certifications: []

languages: []

interests: []
`;

function makeSafeString(value, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

async function ensureAppDirectories() {
  await fs.ensureDir(dataDir);
  await fs.ensureDir(outputDir);
}

async function ensureResumeFile() {
  const exists = await fs.pathExists(resumeDataPath);
  if (!exists) {
    await fs.writeFile(resumeDataPath, defaultResume, 'utf8');
    console.log('Created default data/resume.yml');
  }
}

async function loadResumeData() {
  const sourcePath = await fs.pathExists(rootResumePath) ? rootResumePath : resumeDataPath;
  const content = await fs.readFile(sourcePath, 'utf8');
  return yaml.load(content) ?? {};
}

async function writeResumePdf(resumeData) {
  // Create the element without JSX and attempt to render to a Node stream.
  const element = React.createElement(Resume, { data: resumeData });

  // If the renderer exposes renderToFile (Node-friendly API in v4), use it.
  if (typeof ReactPDF.renderToFile === 'function') {
    await ReactPDF.renderToFile(element, tempOutputPath);
    await fs.move(tempOutputPath, outputPath, { overwrite: true });
    console.log(`PDF generated at ${outputPath}`);
    return;
  }

  // Prefer renderer's renderToStream if available (older API), otherwise
  // use pdf(element).toStream() when supported.
  let stream;
  if (typeof ReactPDF.renderToStream === 'function') {
    stream = await ReactPDF.renderToStream(element);
  } else {
    const doc = ReactPDF.pdf ? ReactPDF.pdf(element) : null;
    if (doc && typeof doc.toStream === 'function') {
      stream = await doc.toStream();
    } else if (doc && typeof doc.toBuffer === 'function') {
      // Fallback: write buffer to temp file first.
      const buffer = await doc.toBuffer();
      await fs.writeFile(tempOutputPath, buffer);
      await fs.move(tempOutputPath, outputPath, { overwrite: true });
      console.log(`PDF generated at ${outputPath}`);
      return;
    } else {
      throw new Error('Renderer does not support stream or buffer output in this environment.');
    }
  }

  await new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(outputPath);
    stream.pipe(writeStream);
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
    stream.on('error', reject);
  });
  console.log(`PDF generated at ${outputPath}`);
}

async function run() {
  try {
    await ensureAppDirectories();
    await ensureResumeFile();
    const rawData = await loadResumeData();
    // normalize personal information and inject icon data URIs when icons exist
    const personal = rawData.personal_information ?? {};

    // load any SVGs present in `icons/` and map them by base name
    const iconsDir = path.join(__dirname, 'icons');
    const iconsMap = {};
    try {
      if (await fs.pathExists(iconsDir)) {
        const files = await fs.readdir(iconsDir);
        for (const f of files) {
          if (f.toLowerCase().endsWith('.svg')) {
            try {
              const svg = await fs.readFile(path.join(iconsDir, f), 'utf8');
              const dataUri = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
              const key = path.basename(f, '.svg').toLowerCase();
              iconsMap[key] = dataUri;
            } catch (e) {
              // ignore individual read errors
            }
          }
        }
      }
    } catch (e) {
      // ignore icon loading errors
    }

    // debug: list detected icons
    try {
      const detected = Object.keys(iconsMap).join(', ');
      if (detected) console.log('Detected icons:', detected);
      else console.log('No icons detected in icons/');
    } catch (e) {}

    // prefer icons from the folder by common keys
    personal.linkedin = personal.linkedin || {};
    personal.github = personal.github || {};
    if (!personal.linkedin.icon) {
      personal.linkedin.icon = iconsMap['linkedin'] || iconsMap['in'] || undefined;
    }
    if (!personal.github.icon) {
      personal.github.icon = iconsMap['github'] || iconsMap['gh'] || undefined;
    }
    // also attach contact icons if provided
    if (!personal.phone_icon) {
      personal.phone_icon = iconsMap['phone'] || iconsMap['telephone'] || iconsMap['mobile'] || undefined;
    }
    if (!personal.location_icon) {
      personal.location_icon = iconsMap['location'] || iconsMap['place'] || undefined;
    }

    const resumeData = {
      personal_information: personal,
      professional_summary: makeSafeString(rawData.professional_summary, ''),
      key_skills: Array.isArray(rawData.key_skills) ? rawData.key_skills : [],
      tools_technologies: rawData.tools_technologies ?? {},
      professional_experience: Array.isArray(rawData.professional_experience) ? rawData.professional_experience : [],
      projects: Array.isArray(rawData.projects) ? rawData.projects : [],
      education: Array.isArray(rawData.education) ? rawData.education : [],
      certifications: Array.isArray(rawData.certifications) ? rawData.certifications : [],
      languages: Array.isArray(rawData.languages) ? rawData.languages : [],
      interests: Array.isArray(rawData.interests) ? rawData.interests : []
    };

    await writeResumePdf(resumeData);
  } catch (error) {
    console.error('Resume generation failed:', error.message ?? error);
    process.exit(1);
  }
}

run();
