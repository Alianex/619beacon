# 619 Beacon Blueprint UI

This project now ships a focused **619 Beacon blueprint dashboard** instead of the default starter counter screen. The app frames platform strategy as implementation-ready sections that engineering and operations teams can execute against immediately.

## What the app presents

- **Microservice architecture** with ownership, capabilities, and implementation focus.
- **Canonical data model** domains with entities and contract constraints.
- **Automation playbooks** that define triggers, systems, and outcomes.
- **Execution roadmap** organized into 30-day delivery horizons.

The content currently comes from a typed local data source (`blueprintData.ts`) so it is easy to evolve and swap with API-backed data later.

## Local development

### Prerequisites
- Node.js 18+

### Commands
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview the production build locally:
   ```bash
   npm run preview
   ```

## Immediate next engineering milestone

Implement a read-only blueprint API endpoint (or mock service adapter) and wire the UI to consume it via a typed client. This keeps the dashboard visuals stable while beginning the migration from static content to environment-specific platform data.
