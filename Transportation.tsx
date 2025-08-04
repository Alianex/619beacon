
import React from 'react';
import type { TransportationProvider } from '../types';
import { BusIcon, ExternalLinkIcon, PhoneIcon } from './Icons';

interface TransportationProps {
    providers: TransportationProvider[];
    isLoading: boolean;
    error: string | null;
}

const TransportationSkeleton: React.FC = () => (
    <div className="space-y-6 animate-pulse">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="flex justify-end">
                    <div className="h-10 w-32 bg-gray-300 rounded-lg"></div>
                </div>
            </div>
        ))}
    </div>
);

const Transportation: React.FC<TransportationProps> = ({ providers, isLoading, error }) => {
    
    const renderContent = () => {
        if (isLoading) {
            return <TransportationSkeleton />;
        }

        if (error) {
            return (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md" role="alert">
                    <p className="font-bold">Error Loading Resources</p>
                    <p className="text-sm">{error}</p>
                </div>
            );
        }
        
        if (providers.length === 0) {
            return (
                 <div className="text-center p-8 bg-white rounded-lg shadow-md border border-gray-200">
                    <BusIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No Transportation Services Found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        We couldn't find any free or low-cost transportation services at this time.
                    </p>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {providers.map((provider) => (
                    <div key={provider.providerName} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-grow">
                            <h3 className="text-xl font-bold text-brand-primary">{provider.providerName}</h3>
                            <p className="mt-2 text-gray-600">{provider.description}</p>
                            <p className="mt-3 text-sm text-gray-800"><span className="font-semibold">Eligibility:</span> {provider.eligibility}</p>
                            <p className="mt-2 text-sm text-gray-800 flex items-center gap-2"><PhoneIcon className="h-4 w-4 text-gray-500"/> <span className="font-semibold">Contact:</span> {provider.contact}</p>
                        </div>
                        {provider.website && (
                             <a
                                href={provider.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit the website for ${provider.providerName}`}
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors duration-200 flex-shrink-0"
                            >
                                <ExternalLinkIcon className="h-5 w-5" />
                                Visit Website
                            </a>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-brand-dark mb-2">Free & Low-Cost Transportation</h2>
            <p className="text-gray-600 mb-8">
                Find transportation assistance programs for eligible individuals in San Diego County.
            </p>
            {renderContent()}
        </div>
    );
};

export default Transportation;
