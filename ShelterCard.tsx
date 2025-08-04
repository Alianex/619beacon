import React from 'react';
import type { Shelter } from '../types';
import { PhoneIcon, MapPinIcon, ClockIcon, InfoIcon, DirectionsIcon } from './Icons';

interface ShelterCardProps {
  shelter: Shelter;
}

// In a production app, this key should be stored securely in an environment variable.
const MAPS_API_KEY = 'AIzaSyCNWWphFckQJSwjzC0QDSTC89WL_3FPlRE';

const ShelterCard: React.FC<ShelterCardProps> = ({ shelter }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out border border-gray-200 flex flex-col">
      <div className="h-48 w-full bg-gray-200" aria-label={`Map showing location of ${shelter.name}`}>
          <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${MAPS_API_KEY}&q=${encodeURIComponent(shelter.address)}`}
          >
          </iframe>
      </div>
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-bold text-brand-dark mb-2">{shelter.name}</h3>
        <p className="text-gray-600 mb-4 flex items-start">
            <InfoIcon className="h-5 w-5 text-brand-primary mr-3 mt-0.5 flex-shrink-0" />
            <span>{shelter.description}</span>
        </p>
        
        <div className="space-y-3 text-gray-700">
            <div className="flex items-center">
                <MapPinIcon className="h-5 w-5 text-brand-primary mr-3 flex-shrink-0" />
                <span>{shelter.address}</span>
            </div>
            <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-brand-primary mr-3 flex-shrink-0" />
                <span>{shelter.phone}</span>
            </div>
            <div className="flex items-center">
                <ClockIcon className="h-5 w-5 text-brand-primary mr-3 flex-shrink-0" />
                <span>{shelter.hours}</span>
            </div>
        </div>

        <div className="mt-5 pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-2">Services Provided:</h4>
          <div className="flex flex-wrap gap-2">
            {shelter.services.map((service, index) => (
              <span key={index} className="px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6 pt-4">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shelter.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-4 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors duration-200"
          aria-label={`Get directions to ${shelter.name}`}
        >
          <DirectionsIcon className="h-5 w-5 mr-2" />
          Get Directions
        </a>
      </div>
    </div>
  );
};

export default ShelterCard;