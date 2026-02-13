# 619 Beacon Blueprint UI

This app replaces the default starter screen with a **619 Beacon blueprint dashboard** that turns platform strategy into implementation-ready execution sections.

## Blueprint sections in the UI

- **Microservice architecture** (owners, capabilities, implementation focus)
- **Canonical data model** (domains, entities, contracts)
- **Automation playbooks** (triggers, systems, outcomes)
- **Execution roadmap** (30-day delivery horizons)

The screen is driven by typed local data in `blueprintData.ts`, making it straightforward to swap in an API-backed source later.

## Run locally

### Prerequisites
- Node.js 18+
- npm 9+

### Install
```bash
npm install
```

### Start development server
```bash
npm run dev
```

### Build production assets
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## Deploy

This is a Vite static app, so deploy the `dist/` output from `npm run build` to any static host.

### Option 1: Vercel
1. Import the repository into Vercel.
2. Use:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
3. Deploy.

### Option 2: Netlify
1. Create a new site from this repository.
2. Use:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Deploy.

### Option 3: GitHub Pages (manual artifact)
1. Run `npm run build`.
2. Publish the contents of `dist/` to your Pages target branch/folder.

## Immediate next engineering milestone

Add a read-only blueprint API endpoint (or adapter) and replace the static `blueprintData` import with a typed fetch client while preserving the same UI contract.
