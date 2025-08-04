
import React from 'react';
import { FoodIcon, ShelterIcon, HealthIcon, YouthIcon, MentalHealthIcon, VeteransIcon } from './Icons';

interface QuickCategoriesProps {
  onSearch: (query: string) => void;
  currentQuery: string;
  isLoading: boolean;
}

const categories = [
  { name: 'Shelter', icon: ShelterIcon, query: 'homeless shelters for families' },
  { name: 'Food Banks', icon: FoodIcon, query: 'food banks' },
  { name: 'Veterans', icon: VeteransIcon, query: 'veterans services' },
  { name: 'Health Clinics', icon: HealthIcon, query: 'free health clinics' },
  { name: 'Youth Services', icon: YouthIcon, query: 'youth services' },
  { name: 'Mental Health', icon: MentalHealthIcon, query: 'mental health support' },
];

const QuickCategories: React.FC<QuickCategoriesProps> = ({ onSearch, currentQuery, isLoading }) => {
  return (
    <div className="mb-8">
      <h3 className="text-base font-semibold text-gray-600 mb-3">Or, select a category:</h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const isActive = currentQuery.toLowerCase() === category.query.toLowerCase();
          return (
            <button
              key={category.name}
              onClick={() => onSearch(category.query)}
              disabled={isLoading}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full shadow-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                isActive
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
              aria-pressed={isActive}
            >
              <category.icon className="h-5 w-5" />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickCategories;