import React from 'react';
import { blueprintData } from './blueprintData';

const App: React.FC = () => {
  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-topline">
          <p className="eyebrow">619 Beacon Implementation Command Center</p>
          <span className="status-pill">Blueprint v2.1 • Build it like a tank</span>
        </div>
        <h1>Modular, scalable infrastructure for compassion that survives politics, turnover, and budget shock.</h1>
        <p className="hero-copy">
          This blueprint maps the full platform strategy: cloud-native microservices, dignity-first client UX,
          automation-led case operations, and policy-grade analytics built for long-term durability.
        </p>

        <nav className="quick-nav" aria-label="Blueprint section navigation">
          <a href="#architecture">Architecture</a>
          <a href="#people">People experience</a>
          <a href="#case-managers">Case managers</a>
          <a href="#automation">Automation</a>
          <a href="#analytics">Analytics</a>
          <a href="#privacy">Privacy</a>
          <a href="#scale">Scale</a>
          <a href="#roadmap">Roadmap</a>
        </nav>

        <div className="kpi-row" aria-label="Blueprint section counts">
          <div className="kpi-card">
            <span>Core services</span>
            <strong>{blueprintData.architecture.length}</strong>
          </div>
          <div className="kpi-card">
            <span>User flow steps</span>
            <strong>{blueprintData.peopleFlow.length}</strong>
          </div>
          <div className="kpi-card">
            <span>Automation workflows</span>
            <strong>{blueprintData.automationWorkflows.length}</strong>
          </div>
          <div className="kpi-card">
            <span>Roadmap phases</span>
            <strong>{blueprintData.executionRoadmap.length}</strong>
          </div>
        </div>
      </header>

      <main className="dashboard-grid">
        <section id="architecture" className="panel">
          <div className="panel-heading">
            <h2>Module 1: Cloud-Native Microservice Architecture</h2>
          </div>
          <div className="card-grid">
            {blueprintData.architecture.map((service) => (
              <article key={service.name} className="blueprint-card">
                <h3>{service.name}</h3>
                <p>{service.purpose}</p>
                <p><strong>Pattern:</strong> {service.deploymentPattern}</p>
                <ul>
                  {service.keyCapabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
                <p className="focus">Resilience: {service.resilienceNotes}</p>
              </article>
            ))}
          </div>
          <h3 className="subheading">Non-negotiable resilience mandates</h3>
          <ul className="stacked-list mandate-list">
            {blueprintData.resilienceMandates.map((mandate) => (
              <li key={mandate}>{mandate}</li>
            ))}
          </ul>
        </section>

        <section id="people" className="panel">
          <div className="panel-heading">
            <h2>Module 2: People Experiencing Homelessness (Dignity First)</h2>
          </div>
          <div className="card-grid">
            {blueprintData.peopleFlow.map((step) => (
              <article key={step.step} className="blueprint-card">
                <h3>{step.step}</h3>
                <p>{step.detail}</p>
                <p className="card-meta">Channels: {step.channels.join(' • ')}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="case-managers" className="panel">
          <div className="panel-heading">
            <h2>Module 3: Outreach Workers & Case Managers</h2>
          </div>
          <div className="card-grid">
            {blueprintData.caseManagerDashboard.map((item) => (
              <article key={item.feature} className="blueprint-card">
                <h3>{item.feature}</h3>
                <p><strong>Impact:</strong> {item.impact}</p>
                <p className="focus">Automation boost: {item.automation}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="automation" className="panel">
          <div className="panel-heading">
            <h2>Module 4: Automation & Workflows</h2>
          </div>
          <div className="card-grid">
            {blueprintData.automationWorkflows.map((workflow) => (
              <article key={workflow.name} className="blueprint-card">
                <h3>{workflow.name}</h3>
                <p><strong>Trigger:</strong> {workflow.trigger}</p>
                <ul>
                  {workflow.sequence.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
                <p className="focus">Escalation: {workflow.escalation}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="analytics" className="panel split-panel">
          <article>
            <div className="panel-heading">
              <h2>Module 5: Analytics, AI & Prediction</h2>
            </div>
            <ul className="stacked-list">
              {blueprintData.analyticsEngine.map((metric) => (
                <li key={metric.capability}>
                  <strong>{metric.capability}</strong>
                  <p>{metric.output}</p>
                  <p className="card-meta">Audience: {metric.audience}</p>
                </li>
              ))}
            </ul>
          </article>

          <article>
            <div className="panel-heading">
              <h2>Module 6: Policy Makers & Funders</h2>
            </div>
            <ul className="stacked-list">
              {blueprintData.executiveDashboard.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section id="privacy" className="panel split-panel">
          <article>
            <div className="panel-heading">
              <h2>Module 7: Privacy, Ethics & Compliance</h2>
            </div>
            <ul className="stacked-list">
              {blueprintData.privacyAndCompliance.map((control) => (
                <li key={control.control}>
                  <strong>{control.control}</strong>
                  <p>{control.implementation}</p>
                </li>
              ))}
            </ul>
          </article>

          <article id="scale">
            <div className="panel-heading">
              <h2>Module 8: Scalability & National Expansion</h2>
            </div>
            <ul className="stacked-list">
              {blueprintData.scalabilityPrinciples.map((item) => (
                <li key={item.principle}>
                  <strong>{item.principle}</strong>
                  <p>{item.implementation}</p>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <aside id="roadmap" className="roadmap-panel">
          <h2>Execution Roadmap</h2>
          <p className="roadmap-intro">Sequence delivery so critical user journeys go live first, then scale with policy-safe governance.</p>
          {blueprintData.executionRoadmap.map((milestone) => (
            <article key={milestone.horizon} className="roadmap-item">
              <p className="milestone-horizon">{milestone.horizon}</p>
              <h3>{milestone.goal}</h3>
              <ul>
                {milestone.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
            </article>
          ))}
        </aside>
      </main>
    </div>
  );
};

export default App;
