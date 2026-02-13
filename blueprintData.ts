export interface MicroserviceBlueprint {
  name: string;
  purpose: string;
  owner: string;
  keyCapabilities: string[];
  implementationFocus: string;
}

export interface DataModelDomain {
  domain: string;
  entities: string[];
  contracts: string[];
  implementationFocus: string;
}

export interface AutomationPlaybook {
  name: string;
  trigger: string;
  systems: string[];
  outcome: string;
  implementationFocus: string;
}

export interface RoadmapMilestone {
  horizon: string;
  goal: string;
  deliverables: string[];
}

export interface BeaconBlueprint {
  microservices: MicroserviceBlueprint[];
  dataModel: DataModelDomain[];
  automationPlaybooks: AutomationPlaybook[];
  executionRoadmap: RoadmapMilestone[];
}

export const blueprintData: BeaconBlueprint = {
  microservices: [
    {
      name: 'Intake Gateway',
      purpose: 'Normalizes incoming demand from partner systems, web forms, and operator-assisted intake.',
      owner: 'Platform API Team',
      keyCapabilities: ['Schema validation', 'Request routing', 'Identity capture'],
      implementationFocus: 'Ship with OpenAPI contracts + observability baseline to ensure every inbound payload is traceable.'
    },
    {
      name: 'Eligibility Engine',
      purpose: 'Applies policy rules and regional program criteria to determine service pathways.',
      owner: 'Rules and Policy Team',
      keyCapabilities: ['Rules execution', 'Versioned policy sets', 'Explainable decisions'],
      implementationFocus: 'Introduce policy-as-code workflow with test fixtures tied to each jurisdiction profile.'
    },
    {
      name: 'Care Coordination Hub',
      purpose: 'Maintains live case context and orchestrates assignments, handoffs, and status updates.',
      owner: 'Case Operations Team',
      keyCapabilities: ['Case timeline', 'Assignee queues', 'Event webhooks'],
      implementationFocus: 'Prioritize event-driven updates to remove manual status reconciliation across channels.'
    }
  ],
  dataModel: [
    {
      domain: 'People & Households',
      entities: ['Person', 'Household', 'ContactPreference', 'ConsentRecord'],
      contracts: ['Unique identity key', 'Shared demographic vocabulary', 'Consent audit envelope'],
      implementationFocus: 'Finalize a canonical person profile and enforce write-through validation in all services.'
    },
    {
      domain: 'Programs & Capacity',
      entities: ['Program', 'Site', 'BedUnit', 'AvailabilitySnapshot'],
      contracts: ['Program taxonomy', 'Capacity state machine', 'Availability freshness SLA'],
      implementationFocus: 'Establish strict availability update intervals and stale-data alerting.'
    },
    {
      domain: 'Engagement & Outcomes',
      entities: ['Case', 'Referral', 'Intervention', 'OutcomeSignal'],
      contracts: ['Case lifecycle states', 'Referral handoff payload', 'Outcome measurement dictionary'],
      implementationFocus: 'Unify case status semantics so reporting and automation operate on consistent milestones.'
    }
  ],
  automationPlaybooks: [
    {
      name: 'Rapid Referral Dispatch',
      trigger: 'Eligibility-approved case enters placement queue.',
      systems: ['Care Coordination Hub', 'Provider Messaging Adapter', 'Notification Service'],
      outcome: 'Top three matching providers are notified with response SLA tracking and escalation timers.',
      implementationFocus: 'Implement idempotent dispatch jobs with retry strategy and duplicate suppression keys.'
    },
    {
      name: 'Capacity Drift Recovery',
      trigger: 'Provider capacity feed misses freshness threshold.',
      systems: ['Capacity Monitor', 'Partner Ops Console', 'Pager workflow'],
      outcome: 'Fallback data source activates and partner operation alert is opened automatically.',
      implementationFocus: 'Define fallback hierarchy and add runbook links directly in generated incidents.'
    },
    {
      name: 'Outcome Follow-up Loop',
      trigger: 'Case closes or transitions to long-term support.',
      systems: ['Case Service', 'Survey Automation', 'Analytics Warehouse'],
      outcome: 'Structured follow-up outreach launches and outcome signals are pushed into analytics dashboards.',
      implementationFocus: 'Design a common event envelope used by both outreach workflows and reporting ingestion.'
    }
  ],
  executionRoadmap: [
    {
      horizon: '0-30 days',
      goal: 'Blueprint hardening and service contract alignment.',
      deliverables: ['API contract review workshop', 'Canonical entity glossary v1', 'Environment observability checklist']
    },
    {
      horizon: '31-60 days',
      goal: 'Deliver first production-ready vertical slice.',
      deliverables: ['Intake Gateway + Eligibility Engine integration', 'Automated policy regression suite', 'Partner sandbox onboarding']
    },
    {
      horizon: '61-90 days',
      goal: 'Operationalize automations and roadmap governance.',
      deliverables: ['Playbook execution metrics panel', 'Incident-to-runbook linking', 'Quarterly architecture decision record cadence']
    }
  ]
};
