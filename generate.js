import path from 'path';
import fs from 'fs-extra';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { pdf } from '@react-pdf/renderer';
import Resume from './dist/Resume.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, 'data');
const outputDir = path.resolve(__dirname, 'output');
const resumeDataPath = path.join(dataDir, 'resume.yml');
const outputPath = path.join(outputDir, 'resume.pdf');

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
  const content = await fs.readFile(resumeDataPath, 'utf8');
  return yaml.load(content) ?? {};
}

async function writeResumePdf(resumeData) {
  const document = pdf(<Resume data={resumeData} />);
  await document.toFile(outputPath);
  console.log(`PDF generated at ${outputPath}`);
}

async function run() {
  try {
    await ensureAppDirectories();
    await ensureResumeFile();
    const rawData = await loadResumeData();
    const resumeData = {
      personal_information: rawData.personal_information ?? {},
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
