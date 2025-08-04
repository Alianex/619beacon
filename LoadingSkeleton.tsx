
import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="flex items-center space-x-3">
            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-200">
        <div className="h-5 bg-gray-200 rounded w-1/4 mb-3"></div>
        <div className="flex flex-wrap gap-2">
            <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-28 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
