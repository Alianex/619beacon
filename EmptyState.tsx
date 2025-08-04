
import React from 'react';

interface EmptyStateProps {
  onRetry: () => void;
}

const EmptyStateIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    </svg>
);

const EmptyState: React.FC<EmptyStateProps> = ({ onRetry }) => {
  return (
    <div className="text-center p-8 bg-white rounded-lg shadow-md border border-gray-200">
      <EmptyStateIcon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">No Results Found</h3>
      <p className="mt-1 text-sm text-gray-500">
        We couldn't find any resources matching your search. Please try a different search term.
      </p>
      <div className="mt-6">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default EmptyState;