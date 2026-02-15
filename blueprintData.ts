export interface MicroserviceBlueprint {
  name: string;
  purpose: string;
  deploymentPattern: string;
  resilienceNotes: string;
  keyCapabilities: string[];
}

export interface ExperienceFlowStep {
  step: string;
  detail: string;
  channels: string[];
}

export interface CaseManagerFeature {
  feature: string;
  impact: string;
  automation: string;
}

export interface WorkflowAutomation {
  name: string;
  trigger: string;
  sequence: string[];
  escalation: string;
}

export interface AnalyticsCapability {
  capability: string;
  output: string;
  audience: string;
}

export interface GovernanceControl {
  control: string;
  implementation: string;
}

export interface ExpansionPrinciple {
  principle: string;
  implementation: string;
}

export interface RoadmapMilestone {
  horizon: string;
  goal: string;
  deliverables: string[];
}

export interface BeaconBlueprint {
  architecture: MicroserviceBlueprint[];
  resilienceMandates: string[];
  peopleFlow: ExperienceFlowStep[];
  caseManagerDashboard: CaseManagerFeature[];
  automationWorkflows: WorkflowAutomation[];
  analyticsEngine: AnalyticsCapability[];
  executiveDashboard: string[];
  privacyAndCompliance: GovernanceControl[];
  scalabilityPrinciples: ExpansionPrinciple[];
  executionRoadmap: RoadmapMilestone[];
}

export const blueprintData: BeaconBlueprint = {
  architecture: [
    {
      name: 'API Gateway',
      purpose: 'Single entry point for mobile, web, SMS adapters, and partner integrations.',
      deploymentPattern: 'Serverless edge gateway with WAF, request signing, and per-route throttling.',
      resilienceNotes: 'Routes degrade gracefully to cached read endpoints when upstream services are delayed.',
      keyCapabilities: ['Traffic routing', 'Schema validation', 'Rate limiting', 'Versioned APIs']
    },
    {
      name: 'Auth & Identity Service',
      purpose: 'Privacy-first identity with anonymous start, alias profiles, and consent-based linking.',
      deploymentPattern: 'Managed identity core with token broker and encrypted consent vault.',
      resilienceNotes: 'Supports guest tokens offline and delayed account-linking when connectivity returns.',
      keyCapabilities: ['Anonymous onboarding', 'Consent receipts', 'RBAC claims', 'Audit-safe identity stitching']
    },
    {
      name: 'Resource Aggregation Service',
      purpose: 'Unifies shelters, food, showers, clinics, and document-help resources from local providers.',
      deploymentPattern: 'Event-driven ingestion workers + normalized search index.',
      resilienceNotes: 'HMIS-style dataset connector is optional; platform runs with local provider CSV/API adapters.',
      keyCapabilities: ['Data normalization', 'Freshness scoring', 'Geo-aware search', 'Offline snapshot exports']
    },
    {
      name: 'Case Management Service',
      purpose: 'Tracks client journeys, milestones, referrals, notes, and appointment commitments.',
      deploymentPattern: 'Domain service with CQRS read models for worker dashboards.',
      resilienceNotes: 'Conflict-safe offline sync for notes, status changes, and attachments.',
      keyCapabilities: ['Timeline tracking', 'Milestone state machine', 'Secure notes/uploads', 'Appointment scheduling']
    },
    {
      name: 'Automation & Workflow Engine',
      purpose: 'Runs low-code workflows driven by operational events and policy rules.',
      deploymentPattern: 'Serverless orchestrator with durable queues and visual workflow definitions.',
      resilienceNotes: 'Retries, dead-letter queues, and policy-based escalation keep workflows reliable under stress.',
      keyCapabilities: ['Event triggers', 'No-code flow editor', 'Escalation timers', 'Human override checkpoints']
    },
    {
      name: 'Analytics & Prediction Engine',
      purpose: 'Converts service activity into trends, forecasts, and service-gap predictions.',
      deploymentPattern: 'Streaming event bus + warehouse + forecast jobs.',
      resilienceNotes: 'Uses rolling models resilient to partial data and delayed partner feeds.',
      keyCapabilities: ['Trend analytics', 'Heat maps', 'Shortage forecasting', 'Impact report generation']
    },
    {
      name: 'Notification & Messaging Service',
      purpose: 'Delivers outreach through push, SMS, and WhatsApp with fallback logic.',
      deploymentPattern: 'Provider-agnostic messaging abstraction with channel policy rules.',
      resilienceNotes: 'If app delivery fails, SMS fallback is automatic for critical reminders and safety alerts.',
      keyCapabilities: ['Multichannel delivery', 'Template localization', 'Delivery receipts', 'Fallback routing']
    },
    {
      name: 'Admin & Policy Dashboard',
      purpose: 'Governs configurations, city policy rules, service taxonomies, and operational health.',
      deploymentPattern: 'Read/write admin console backed by policy registry APIs.',
      resilienceNotes: 'City-specific policy packs can be swapped without forking application code.',
      keyCapabilities: ['Policy versioning', 'Configuration governance', 'Access reviews', 'Audit exploration']
    }
  ],
  resilienceMandates: [
    'Build it like a tank: every critical user action must be queue-backed, replay-safe, and observable.',
    'Offline-first mobile clients cache search + case essentials locally and sync when online.',
    'SMS/WhatsApp fallback is mandatory for reminders, check-ins, and weather or safety alerts.',
    'No hard dependency on HMIS: adapters are pluggable and can be disabled per city without downtime.'
  ],
  peopleFlow: [
    {
      step: 'Start in under 30 seconds',
      detail: 'No email requirement. User begins with alias or anonymous profile and optional PIN.',
      channels: ['Web', 'PWA', 'SMS']
    },
    {
      step: 'Search by immediate need',
      detail: 'Single-tap categories: bed, food, shower, clinic, ID help; zero shame language across screens.',
      channels: ['Web', 'PWA', 'WhatsApp']
    },
    {
      step: 'Consent-based location',
      detail: 'Location is optional and requested only to improve proximity sorting and transit guidance.',
      channels: ['Web', 'Android']
    },
    {
      step: 'Low-end Android resilience',
      detail: 'Compressed assets, lightweight layout, and offline cache enable use while exhausted or disconnected.',
      channels: ['Android', 'PWA']
    }
  ],
  caseManagerDashboard: [
    {
      feature: 'Assigned client roster + service status',
      impact: 'Workers immediately see who is blocked, progressing, or at risk of churn.',
      automation: 'Status updates auto-ingest from referrals and provider events.'
    },
    {
      feature: 'Next-best service recommendations',
      impact: 'Faster decisions with less tab switching and less policy guesswork.',
      automation: 'Rules + prediction scores generate ranked options per client need profile.'
    },
    {
      feature: 'Milestones, notes, uploads, appointments',
      impact: 'Full journey continuity even across handoffs between outreach teams.',
      automation: 'Forms are prefilled from prior events to cut manual data entry by 60%+.'
    },
    {
      feature: 'Offline operations + sync',
      impact: 'Street outreach can continue regardless of signal quality.',
      automation: 'Background sync resolves conflicts with timeline-first merge rules.'
    }
  ],
  automationWorkflows: [
    {
      name: 'Missed shelter check-in',
      trigger: 'No check-in confirmation within expected arrival window.',
      sequence: ['Send SMS reminder', 'Wait 30 minutes', 'Notify assigned outreach worker'],
      escalation: 'Escalate to supervisor if still unresolved after 2 hours.'
    },
    {
      name: 'Heat wave response',
      trigger: 'Weather feed crosses city-defined heat-risk threshold.',
      sequence: ['Identify nearby clients', 'Push cooling center recommendations', 'Open transport-assist task'],
      escalation: 'Escalate high-risk cohorts to urgent outreach queue.'
    },
    {
      name: 'No service match in 48 hours',
      trigger: 'Need remains open without a viable placement match for 48 hours.',
      sequence: ['Create escalation case', 'Notify supervisor', 'Trigger policy exception review'],
      escalation: 'Auto-generate leadership alert for persistent system gaps.'
    }
  ],
  analyticsEngine: [
    {
      capability: 'Service usage trend tracking',
      output: 'Weekly and monthly utilization trendlines segmented by need type and geography.',
      audience: 'Operations + program leadership'
    },
    {
      capability: 'Geographic service gap detection',
      output: 'Heat maps identifying neighborhoods with high demand and low service coverage.',
      audience: 'City planners + provider networks'
    },
    {
      capability: 'Capacity shortage forecasting',
      output: 'Short-horizon predictions for shelter/clinic capacity stress before failure points.',
      audience: 'System operators + funders'
    }
  ],
  executiveDashboard: [
    'Real-time impact metrics with trend context and confidence indicators.',
    'Funding ROI visualizations that connect spend to measurable outcomes.',
    'Unmet-needs spotlight for policy action and procurement prioritization.',
    'Exportable briefing packets (PDF/CSV) for board, council, and funder reporting.'
  ],
  privacyAndCompliance: [
    {
      control: 'Consent-based data sharing',
      implementation: 'Granular consent prompts, revocation support, and immutable consent audit history.'
    },
    {
      control: 'Minimal identity requirements',
      implementation: 'Anonymous and alias workflows are first-class; legal identity collected only when needed.'
    },
    {
      control: 'Role-based access control',
      implementation: 'Least-privilege permissions with role scopes for outreach, provider, and leadership personas.'
    },
    {
      control: 'Audit logs + data ownership clarity',
      implementation: 'All sensitive actions are logged; users can view what data exists and who accessed it.'
    }
  ],
  scalabilityPrinciples: [
    {
      principle: 'City-ready deployment kits',
      implementation: 'Infrastructure-as-code templates with minimal bootstrap variables per city.'
    },
    {
      principle: 'Customizable resource taxonomy',
      implementation: 'Admin-configurable need categories and provider types without code forks.'
    },
    {
      principle: 'Local data-source plug-ins',
      implementation: 'Connector framework for HMIS-style feeds, municipal APIs, and NGO spreadsheets.'
    },
    {
      principle: 'Brandable experience layer',
      implementation: 'Theme + content packs allow city branding while preserving core platform behavior.'
    }
  ],
  executionRoadmap: [
    {
      horizon: '0-45 days',
      goal: 'Stand up tank-grade platform foundation.',
      deliverables: ['API Gateway + Auth baseline', 'Offline-first client shell', 'Messaging fallback integration']
    },
    {
      horizon: '46-90 days',
      goal: 'Launch dignity-first user flow + case manager acceleration.',
      deliverables: ['Anonymous intake + need search', 'Case dashboard with automation assist', 'Workflow examples in production']
    },
    {
      horizon: '91-150 days',
      goal: 'Scale decision intelligence and policy influence.',
      deliverables: ['Forecasting dashboards', 'Executive read-only ROI views', 'City deployment starter kit']
    }
  ]
};
