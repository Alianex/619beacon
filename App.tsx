import React from 'react';
import { blueprintData } from './blueprintData';

const App: React.FC = () => {
  return (
    <div className="app-shell">
      <header className="hero">
        <p className="eyebrow">619 Beacon Platform Blueprint</p>
        <h1>Turn platform vision into sequenced engineering delivery.</h1>
        <p className="hero-copy">
          This implementation blueprint translates architecture strategy into concrete services,
          canonical data contracts, automation playbooks, and an execution roadmap that teams can ship.
        </p>
      </header>

      <main className="dashboard-grid">
        <section className="panel">
          <div className="panel-heading">
            <h2>Microservice Architecture</h2>
          </div>
          <div className="card-grid">
            {blueprintData.microservices.map((service) => (
              <article key={service.name} className="blueprint-card">
                <h3>{service.name}</h3>
                <p>{service.purpose}</p>
                <ul>
                  {service.keyCapabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
                <p className="card-meta">Owner: {service.owner}</p>
                <p className="focus">Implementation focus: {service.implementationFocus}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <h2>Canonical Data Model</h2>
          </div>
          <div className="card-grid">
            {blueprintData.dataModel.map((domain) => (
              <article key={domain.domain} className="blueprint-card">
                <h3>{domain.domain}</h3>
                <p className="section-label">Entities</p>
                <ul>
                  {domain.entities.map((entity) => (
                    <li key={entity}>{entity}</li>
                  ))}
                </ul>
                <p className="section-label">Contracts</p>
                <ul>
                  {domain.contracts.map((contract) => (
                    <li key={contract}>{contract}</li>
                  ))}
                </ul>
                <p className="focus">Implementation focus: {domain.implementationFocus}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-heading">
            <h2>Automation Playbooks</h2>
          </div>
          <div className="card-grid">
            {blueprintData.automationPlaybooks.map((playbook) => (
              <article key={playbook.name} className="blueprint-card">
                <h3>{playbook.name}</h3>
                <p><strong>Trigger:</strong> {playbook.trigger}</p>
                <p><strong>Systems:</strong> {playbook.systems.join(' • ')}</p>
                <p><strong>Outcome:</strong> {playbook.outcome}</p>
                <p className="focus">Implementation focus: {playbook.implementationFocus}</p>
              </article>
            ))}
          </div>
        </section>

        <aside className="roadmap-panel">
          <h2>Execution Roadmap</h2>
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
