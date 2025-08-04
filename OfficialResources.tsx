import React from 'react';
import { ExternalLinkIcon } from './Icons';

const resources = [
  {
    name: '211 San Diego',
    description: 'A comprehensive information and referral system connecting people to community, health, and disaster support services.',
    url: 'https://211sandiego.org/',
    ariaLabel: 'Visit the 211 San Diego website'
  },
  {
    name: 'CalVet',
    description: 'The official California Department of Veterans Affairs website, providing information on state and federal benefits for veterans and their families.',
    url: 'https://www.calvet.ca.gov/',
    ariaLabel: 'Visit the CalVet website'
  },
  {
    name: 'CalFresh Program',
    description: 'California\'s food stamp (SNAP) program. Get information on how to apply for monthly food benefits for individuals and families.',
    url: 'https://www.sandiegocounty.gov/content/sdc/hhsa/programs/ssp/calfresh.html',
    ariaLabel: 'Visit the San Diego CalFresh Program website'
  },
  {
    name: 'San Diego County Homeless Solutions',
    description: 'The County\'s official portal for homeless solutions and equitable communities, providing data, resources, and program information.',
    url: 'https://www.sandiegocounty.gov/content/sdc/homeless-solutions-and-equitable-communities.html',
    ariaLabel: 'Visit the San Diego County Homeless Solutions website'
  }
];

const OfficialResources: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-brand-dark mb-2">Official Resources</h2>
      <p className="text-gray-600 mb-8">Direct links to trusted government and community programs for additional support.</p>
      
      <div className="space-y-6">
        {resources.map((resource) => (
          <div key={resource.name} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-brand-primary">{resource.name}</h3>
              <p className="mt-1 text-gray-600">{resource.description}</p>
            </div>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={resource.ariaLabel}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors duration-200 flex-shrink-0"
            >
              <ExternalLinkIcon className="h-5 w-5" />
              Visit Website
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficialResources;
