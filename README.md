# RISC-V Software Ecosystem Dashboard

Static React + Vite dashboard visualizing RISC-V software enablement maturity across key packages.

This site serves as a continuously maintained catalog of porting status, upstream maturity, and ecosystem coverage.

---

## Live Deployment

The site is deployed using GitHub Pages and rebuilt automatically:

- on every commit/merge to `main`
- hourly via scheduled GitHub Actions
- manually via the Actions tab (workflow dispatch)

📍 **Note:** The **“Last updated”** timestamp displayed on the dashboard reflects the most recent successful CI deployment.

---

## Features

- Horizontal enablement snapshot bar (global view, not affected by filters/search)
- Global table search (all columns)
- Category / Type / Status filters
- CSV export of currently filtered/sorted view
- Strict YAML schema validation before deploy
- Clean Filters reset control
- Hyperlinked software entries with ⇗ indicator

---

## Tech Stack

| Layer           | Technology                     |
|----------------|---------------------------------|
| UI             | React + Vite + TypeScript       |
| Styling        | Tailwind CSS                    |
| Data format    | YAML (`public/data.yaml`)       |
| Validation     | Ajv + JSON Schema               |
| CSV export     | PapaParse                       |
| Deployment     | GitHub Pages + GitHub Actions   |

---

## Repository Structure

```
.
├── public/
│   ├── data.yaml
│   └── riscv-logo.png
├── schema/
│   └── data-schema.json
├── scripts/
│   └── validate-data.mjs
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── components/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── package.json
└── vite.config.ts
```

---

## Running Locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Validate YAML schema:

```bash
npm run validate:data
```

---

## Deployment Model

| Trigger                  | Action                       |
|--------------------------|------------------------------|
| Push to `main`           | validate → build → deploy    |
| Scheduled cron (hourly)  | validate → build → deploy    |
| Manual dispatch          | validate → build → deploy    |

If validation fails:
- build halts
- deploy stops
- current production site remains unchanged

---

## Data Format Contract

`public/data.yaml` must satisfy:

```
schema/data-schema.json
```

Example entry:

```yaml
- id: 001
  category: Toolchain
  software: "LLVM"
  status: Enabled
  type: Open Source
  riscvEnablement: "https://github.com/llvm/llvm-project"
```

### Status Values

| Status        | Meaning |
|---------------|---------|
| Enabled       | Full support, production ready |
| In Progress   | Enablement underway |
| Optimized     | RISC-V tuned/enhanced |
| TBD           | Pending verification |

---

## Contributing

1. Edit `public/data.yaml`
2. Validate:

```bash
npm run validate:data
```
