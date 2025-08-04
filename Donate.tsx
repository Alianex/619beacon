
import React from 'react';
import { DonateIcon, ExternalLinkIcon } from './Icons';

const Donate: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <DonateIcon className="h-16 w-16 mx-auto text-brand-accent mb-4" />
        <h2 className="text-3xl font-bold text-brand-dark mb-2">Support Our Mission</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          619 Beacon is a passion project dedicated to connecting individuals with vital resources. Your support helps us maintain and improve this platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card for Art Outreach */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 flex flex-col text-center">
          <h3 className="text-2xl font-bold text-brand-primary mb-3">Support a Local Charity</h3>
          <p className="text-gray-600 flex-grow mb-6">
            We are proud to partner with <span className="font-semibold">Art Outreach San Diego</span>, a non-profit empowering at-risk youth through the transformative power of art and mentorship. Your donation directly supports their vital work in our community.
          </p>
          <a
            href="https://www.art-outreach.org/donate"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors duration-200"
          >
            <ExternalLinkIcon className="h-5 w-5" />
            Donate to Art Outreach
          </a>
        </div>

        {/* Card for Developer Support */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 flex flex-col text-center">
          <h3 className="text-2xl font-bold text-brand-dark mb-3">Support the Developer</h3>
          <p className="text-gray-600 flex-grow mb-6">
            If you find this app helpful, consider supporting the developer. Donations help cover server costs, API fees, and fuel future development to keep this resource free and accessible for everyone.
          </p>
          <a
            href="https://www.buymeacoffee.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 transition-colors duration-200"
          >
            <DonateIcon className="h-5 w-5" />
            Support 619 Beacon
          </a>
        </div>
      </div>
    </div>
  );
};

export default Donate;