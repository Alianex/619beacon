
import React, { useState, useEffect } from 'react';
import type { VeteranServiceCategory } from '../types';
import { BriefcaseIcon, HealthIcon, JusticeIcon, ShelterIcon, MentalHealthIcon, DirectoryIcon, YouthIcon, VeteransIcon } from './Icons';

interface VeteranResourcesProps {
  services: VeteranServiceCategory[];
  isLoading: boolean;
  error: string | null;
}

// A mapping from category names (or keywords) to icons
const categoryIcons: { [key: string]: React.FC<{ className?: string }> } = {
  housing: ShelterIcon,
  health: HealthIcon,
  wellness: HealthIcon,
  employment: BriefcaseIcon,
  justice: JusticeIcon,
  family: YouthIcon,
  care: HealthIcon,
  community: VeteransIcon,
  national: VeteransIcon,
  support: VeteransIcon,
  resource: DirectoryIcon,
  directory: DirectoryIcon,
};

const getIconForCategory = (categoryName: string) => {
  const lowerCaseCategory = categoryName.toLowerCase();
  for (const key in categoryIcons) {
    if (lowerCaseCategory.includes(key)) {
      return categoryIcons[key];
    }
  }
  return ShelterIcon; // Default icon
};

const AccordionItem: React.FC<{ category: VeteranServiceCategory, isOpen: boolean, onToggle: () => void }> = ({ category, isOpen, onToggle }) => {
  const Icon = getIconForCategory(category.category);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4 bg-white shadow-sm">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-5 text-left transition duration-300 ease-in-out focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <Icon className="h-8 w-8 text-brand-primary mr-4" />
          <span className="text-xl font-bold text-brand-dark">{category.category}</span>
        </div>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-5 pb-5 border-t border-gray-200">
          <p className="text-gray-600 mt-4 mb-5">{category.description}</p>
          <div className="space-y-4">
            {category.programs.map((program) => (
              <div key={program.name} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h4 className="font-semibold text-gray-800">{program.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const VeteranResourcesSkeleton: React.FC = () => (
    <div className="animate-pulse">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5 mb-4 bg-white shadow-sm">
                <div className="flex items-center">
                    <div className="h-8 w-8 bg-gray-300 rounded-full mr-4"></div>
                    <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
                </div>
            </div>
        ))}
    </div>
);


const VeteranResources: React.FC<VeteranResourcesProps> = ({ services, isLoading, error }) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    // Open the first accordion by default when data loads
    if (!isLoading && services && services.length > 0 && !openAccordion) {
      setOpenAccordion(services[0].category);
    }
  }, [services, isLoading, openAccordion]);
  
  const handleToggle = (categoryName: string) => {
    setOpenAccordion(openAccordion === categoryName ? null : categoryName);
  };

  if (error) {
    return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md" role="alert">
            <p className="font-bold">Error loading resources</p>
            <p className="text-sm">{error}</p>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-brand-dark mb-2">Veteran Support Services</h2>
      <p className="text-gray-600 mb-8">
        Dedicated resources and programs for veterans and their families in San Diego. Click on a category to learn more.
      </p>

      {isLoading ? (
        <VeteranResourcesSkeleton />
      ) : (
        <div>
          {services.map((category) => (
            <AccordionItem
              key={category.category}
              category={category}
              isOpen={openAccordion === category.category}
              onToggle={() => handleToggle(category.category)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VeteranResources;
