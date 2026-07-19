

---

# Prompt for Codex

I accidentally lost my entire project. I want you to recreate it from scratch as a **production-quality project**.

## Goal

Create a Resume Generator that:

* uses **React** for the PDF template (`@react-pdf/renderer`)
* uses **Node.js** to generate the PDF
* reads data from a YAML file
* automatically generates a PDF
* works perfectly inside Docker
* is designed to be used mostly with a mounted volume of the container created using the Dockerfile
* automatically creates required folders/files if they don't exist
* produces a professional ATS-friendly resume matching the attached reference image.

---

# Folder Structure

Create the following structure.

```text
resume-generator/
│
├── src/
│   ├── Resume.jsx
│   ├── components/
│   │      Header.jsx
│   │      Section.jsx
│   │      Experience.jsx
│   │      Project.jsx
│   │      Education.jsx
│   │      Skills.jsx
│   │      Tools.jsx
│   │
│   └── styles.js
│
├── data/
│   └── resume.yml
│
├── output/
│   └── resume.pdf
│
├── generate.js
├── package.json
├── babel.config.js
├── Dockerfile
├── .dockerignore
├── .gitignore
├── README.md
```

---

# Automatic Folder Creation

Whenever

```
node generate.js
```

runs, it should automatically:

Create

```
data/
```

if it doesn't exist.

Create

```
output/
```

if it doesn't exist.

If

```
data/resume.yml
```

does not exist

create it automatically using the default template.

If

```
output/
```

doesn't exist

create it automatically.

The user should never have to manually create folders.

---

# YAML

Use

```
js-yaml
```

to parse

```
data/resume.yml
```

The schema should support:

```
personal_information

professional_summary

key_skills

tools_technologies

professional_experience

projects

education

certifications

languages

interests
```

Use the schema below as the default template.

(paste the YAML schema previously provided)

---

# Resume Layout

Design the PDF to closely resemble the attached reference image.

Characteristics:

Single column

Professional ATS format

Minimal whitespace

Blue section headings

Bold name

Compact typography

Everything fits on one page whenever possible

Sections:

Header

Professional Summary

Key Skills

Tools & Technologies

Professional Experience

Projects

Education

Certifications (optional)

No tables.

No icons except very small optional contact icons.

Professional typography.

---

# Styling

Use only

```
@react-pdf/renderer
```

No HTML.

No CSS.

No browser rendering.

Use StyleSheet.

Font hierarchy

Name

22-24

Section Heading

11-12

Body

9-10

Bullets

8.5-9

Margins around

20

Section heading should have

Blue text

Bold

Horizontal blue line underneath

---

# React Components

Split the template into reusable components.

Header

Section

Skills

Tools

Experience

Projects

Education

Resume

Avoid one huge file.

---

# Generate Script

generate.js should

Load YAML

Validate data

Create folders

Create missing YAML

Render PDF

Save to

```
output/resume.pdf
```

Print

```
Resume generated successfully!
```

---

# Package.json

Include proper scripts.

```
npm install

npm run generate

npm start
```

Dependencies

```
react

react-dom

@react-pdf/renderer

js-yaml

fs-extra

@babel/core

@babel/node

@babel/preset-env

@babel/preset-react
```

Configure Babel correctly.

---

# Docker

Create a production-ready Dockerfile.

Requirements

Use an official Node LTS image (currently Node 22 LTS unless compatibility requires Node 20 LTS).

Use a small base image (prefer `node:22-bookworm-slim` or similar).

Install only the libraries required by `@react-pdf/renderer`.

Set

```
WORKDIR /app
```

Copy package files

Install dependencies

Copy source

Automatically create

```
data
```

and

```
output
```

Expose a mounted volume

```
VOLUME ["/app/data","/app/output"]
```

Default command

```
npm run generate
```

The container should work like

```bash
docker build -t resume-generator .

docker run \
-v $(pwd)/data:/app/data \
-v $(pwd)/output:/app/output \
resume-generator
```

Every execution should regenerate

```
output/resume.pdf
```

using

```
data/resume.yml
```

without rebuilding the image.

---

# Docker Ignore

Ignore

```
node_modules

output

.git
```

---

# Git Ignore

Ignore

```
node_modules

output

.env

npm-debug.log
```

---

# README

Create a detailed README containing

Installation

Local execution

Docker execution

Folder structure

Customizing resume.yml

Generating PDF

Troubleshooting

Example commands

---

# Code Quality

Use ES6.

Use async/await.

Handle missing fields gracefully.

Never crash because a YAML field is missing.

Use default values.

Keep the project modular.

Comment major sections.

Use clean architecture.

---

# Final Goal

When I clone the repository and run:

```bash
npm install
npm run generate
```

or

```bash
docker build -t resume-generator .

docker run \
-v ./data:/app/data \
-v ./output:/app/output \
resume-generator
```

the application should automatically:

* create missing folders,
* create a default `resume.yml` if needed,
* read the YAML,
* generate `output/resume.pdf`,
* produce a resume visually similar to the attached reference,
* and require no manual setup beyond editing `data/resume.yml`.
