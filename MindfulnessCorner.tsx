
import React, { useState, useEffect, useCallback } from 'react';
import { getMindfulnessTip } from '../services/geminiService';
import type { MindfulnessTip } from '../types';
import { MindfulnessIcon } from './Icons';

const MindfulnessCorner: React.FC = () => {
  const [tip, setTip] = useState<MindfulnessTip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTip = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newTip = await getMindfulnessTip();
      setTip(newTip);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while fetching a tip.");
      }
      setTip(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTip();
  }, [fetchTip]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="animate-pulse w-full">
          <div className="h-7 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div>
            <p className="font-semibold text-red-600">Could not load tip</p>
            <p className="text-sm text-red-500">{error}</p>
        </div>
      );
    }

    if (tip) {
      return (
        <div className="fade-in">
          <h3 className="text-2xl font-bold text-brand-dark mb-3">{tip.title}</h3>
          <p className="text-gray-600 leading-relaxed">{tip.tip}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-2xl mx-auto py-8 text-center">
      <style>{`
        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <MindfulnessIcon className="h-16 w-16 mx-auto text-brand-primary mb-4" />
        <h2 className="text-3xl font-bold text-brand-dark mb-6">A Moment of Calm</h2>
        <div className="min-h-[120px] flex items-center justify-center p-4 bg-gray-50 rounded-lg">
            {renderContent()}
        </div>
      </div>
      <button
        onClick={fetchTip}
        disabled={isLoading}
        className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Loading...' : 'Get a New Tip'}
      </button>
    </div>
  );
};

export default MindfulnessCorner;