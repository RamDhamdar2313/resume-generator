const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const ReactPDF = require('@react-pdf/renderer');

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
  Experienced professional with a strong background in ...

key_skills:
  - Skill 1
  - Skill 2
  - Skill 3

tools_technologies:
  cloud:
    - AWS
    - Azure
  containers:
    - Docker
    - Kubernetes
  infrastructure_as_code:
    - Terraform
  cicd:
    - GitHub Actions
  observability:
    - Prometheus
  programming:
    - JavaScript
    - Python
  operating_systems:
    - Linux
  version_control:
    - Git
  databases:
    - PostgreSQL

professional_experience:
  - company: "Example Company"
    location: "City, Country"
    duration: "2025 – Present"
    responsibilities:
      - "Implemented ..."

projects:
  - title: "Project Title"
    duration: "2025"
    achievements:
      - "Delivered ..."

education:
  - degree: "Bachelor of Science"
    specialization: "Computer Science"
    institute: "University Name"
    duration: "2021 – 2025"

certifications: []

languages: []

interests: []
`;

function ensureDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function ensureDataFile() {
  if (!fs.existsSync(resumeDataPath)) {
    fs.writeFileSync(resumeDataPath, defaultResume, 'utf8');
  }
}

ensureDirectory(dataDir);
ensureDirectory(outputDir);
ensureDataFile();

const data = yaml.load(fs.readFileSync(resumeDataPath, 'utf8'));

require('@babel/register')({
  presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
  extensions: ['.js', '.jsx']
});

const Resume = require('./src/Resume.jsx').default;

const element = ReactPDF.createElement(Resume, { data });
const pdf = ReactPDF.renderToStream(element);

const writeStream = fs.createWriteStream(outputPath);
pdf.pipe(writeStream);

writeStream.on('finish', () => {
  console.log(`PDF created at ${outputPath}`);
});

writeStream.on('error', (error) => {
  console.error('Failed to write PDF:', error);
  process.exit(1);
});
