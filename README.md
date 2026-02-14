# 619 Beacon Blueprint UI

This Vite app presents a **modular execution blueprint** for 619 Beacon across architecture, dignity-first user experience, automation, analytics, governance, and city-scale rollout.

## What the upgraded UI now covers

- **Module 1:** Cloud-native microservice architecture with all required services:
  - API Gateway
  - Auth & Identity (privacy-first + consent-based)
  - Resource Aggregation
  - Case Management
  - Automation & Workflow Engine
  - Analytics & Prediction
  - Notification & Messaging
  - Admin & Policy Dashboard
- **Module 2:** Dignity-first experience flow for people experiencing homelessness (no email, alias/anonymous identity, low-end Android, SMS/WhatsApp fallback, consented location).
- **Module 3:** Case manager dashboard capabilities with automation-first workflows targeting 60%+ manual entry reduction.
- **Module 4:** Hard-coded workflow examples and escalation paths.
- **Module 5/6:** Analytics + executive policy dashboard outcomes (heat maps, trends, forecasting, ROI and exportable reporting).
- **Module 7:** Privacy-by-design controls (consent, RBAC, audit logs, ownership transparency).
- **Module 8:** Scalability model for multi-city deployment and branding without forks.

All sections are powered by typed local data in `blueprintData.ts` so the UI contract can be replaced by API adapters later.

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

This is a static Vite build. Deploy `dist/` from `npm run build`.

- **Vercel:** `vercel.json` included.
- **Netlify:** `netlify.toml` included.
- **GitHub Pages:** publish `dist/` artifact.

## Next engineering milestone

Replace local `blueprintData` with typed read-only endpoints:
1. Blueprint config API (modules + roadmap)
2. City profile API (branding + policy packs)
3. Workflow template API (low-code definitions + versioning)
