# Resume Generator — Usage Guide

This repository generates a PDF resume from a YAML file using `@react-pdf/renderer`.

Quick facts
- Source YAML: `resume.yml` (root of repository)
- Icons: `icons/` (optional SVGs: `linkedin.svg`, `github.svg`, `phone.svg`, `location.svg`)
- Output: `output/resume.pdf`

Requirements
- Docker (recommended for consistent builds)
- Or Node.js (>= 22) + npm (for local usage)

Docker workflow (recommended)
1. Build the Docker image:

```bash
docker build -t resume-generator:latest .
```

2. Run the container to generate the PDF (mount the repo so your `resume.yml` and `icons/` are used):

Linux / macOS:

```bash
docker run --rm -v "$(pwd)":/app -w /app resume-generator:latest bash -lc "npm ci && npm run generate"
```

PowerShell (Windows):

```powershell
docker run --rm -v ${PWD}:/app -w /app resume-generator:latest powershell -Command "npm ci; npm run generate"
```

After the command completes the generated PDF will be at `output/resume.pdf` on your host.

Running on a remote machine (EC2, VPS) and downloading `resume.pdf`

Option A — SCP (recommended and secure):

From your local machine (replace `ubuntu` and `<EC2_IP>` with your user and host):

```bash
scp ubuntu@<EC2_IP>:/home/ubuntu/resume-generator/output/resume.pdf ./
```

Option B — Temporary HTTP server (less secure, open only when needed):

On the remote machine (inside the repo):

```bash
cd output
python3 -m http.server 8000
```

Then on your local machine:

```bash
curl -O http://<EC2_IP>:8000/resume.pdf
```

Note: For Option B ensure the remote's firewall/security group allows inbound traffic on the chosen port. Use SCP when possible.

Local usage with Node/npm
1. Install dependencies:

```bash
npm install
```

2. Generate the PDF locally:

```bash
npm run generate
```

3. Output file:

```
output/resume.pdf
```

Troubleshooting & tips
- If `resume.pdf` is locked (``EBUSY``), close any PDF viewer before regenerating.
- Ensure `icons/` contains the SVGs you expect (the generator embeds them). If icons don't show, make sure the SVGs are self-contained (no external CSS).
- If running in Docker and you see stale output, re-run the container with the volume mount pointing at the repository root.
- For CI, build the Docker image and run the `npm run generate` step; collect `output/resume.pdf` as an artifact.

Files ignored by Git
- `node_modules/`
- `dist/`
- `output/`
- environment files (`.env`)
- editor folders (`.vscode/`, `.idea/`)

If you want a more compact header (icons-only) or different icon tinting, tell me which option and I'll update the components and regenerate the PDF.
