
import React, { useState, useCallback, useEffect } from 'react';
import type { Shelter, GroundingSource, VeteranServiceCategory, TransportationProvider } from './types';
import { findShelters, getVeteranServices, getTransportationInfo } from './services/geminiService';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ShelterCard from './components/ShelterCard';
import LoadingSkeleton from './components/LoadingSkeleton';
import ErrorMessage from './components/ErrorMessage';
import EmptyState from './components/EmptyState';
import QuickCategories from './components/QuickCategories';
import MindfulnessCorner from './components/MindfulnessCorner';
import SOSButton from './components/SOSButton';
import OfficialResources from './components/OfficialResources';
import VeteranResources from './components/VeteranResources';
import Transportation from './components/Transportation';
import Feedback from './components/Feedback';
import Donate from './components/Donate';
import MapView from './components/MapView';


import { 
  ShelterIcon, 
  VeteransIcon, 
  BusIcon, 
  DirectoryIcon, 
  MindfulnessIcon, 
  FeedbackIcon, 
  DonateIcon,
  MapPinIcon,
  ListIcon,
  ExternalLinkIcon
} from './components/Icons';

type ActiveTab = 'resources' | 'veteran' | 'transportation' | 'official' | 'mindfulness' | 'feedback' | 'donate';
type ViewMode = 'list' | 'map';

// It's better to manage API keys via environment variables, but for this context, we centralize it here.
const MAPS_API_KEY = 'AIzaSyCNWWphFckQJSwjzC0QDSTC89WL_3FPlRE';

const TabButton = ({
    onClick,
    isActive,
    children,
    ariaLabel
}: {
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
    ariaLabel: string;
}) => (
    <button
        onClick={onClick}
        aria-label={ariaLabel}
        className={`whitespace-nowrap flex items-center gap-2 py-3 px-2 border-b-2 font-medium text-base transition-colors duration-200 ${
            isActive
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
    >
        {children}
    </button>
);

const ViewModeToggle = ({ viewMode, setViewMode }: { viewMode: ViewMode, setViewMode: (mode: ViewMode) => void }) => (
    <div className="flex items-center gap-2 bg-gray-200 rounded-full p-1">
        <button
            onClick={() => setViewMode('list')}
            aria-pressed={viewMode === 'list'}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${viewMode === 'list' ? 'bg-white text-brand-primary shadow' : 'text-gray-600 hover:bg-gray-300'}`}
        >
            <ListIcon className="h-5 w-5" />
            List
        </button>
        <button
            onClick={() => setViewMode('map')}
            aria-pressed={viewMode === 'map'}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 ${viewMode === 'map' ? 'bg-white text-brand-primary shadow' : 'text-gray-600 hover:bg-gray-300'}`}
        >
            <MapPinIcon className="h-5 w-5" />
            Map
        </button>
    </div>
);


const App: React.FC = () => {
  // Main Resource Finder State
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string>("homeless shelters for families");
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  
  // App-wide state
  const [activeTab, setActiveTab] = useState<ActiveTab>('resources');

  // State for Veteran Resources Tab
  const [veteranServices, setVeteranServices] = useState<VeteranServiceCategory[]>([]);
  const [isVeteranLoading, setIsVeteranLoading] = useState(false);
  const [veteranError, setVeteranError] = useState<string | null>(null);

  // State for Transportation Tab
  const [transportation, setTransportation] = useState<TransportationProvider[]>([]);
  const [isTransportLoading, setIsTransportLoading] = useState(false);
  const [transportError, setTransportError] = useState<string | null>(null);


  const handleSearch = useCallback(async (query: string) => {
    setActiveTab('resources');
    setCurrentQuery(query);
    setIsLoading(true);
    setError(null);
    setShelters([]);
    setSources([]);

    try {
      const { shelters: results, sources: groundingSources } = await findShelters(query);
      setShelters(results);
      setSources(groundingSources);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect for fetching data based on the active tab
  useEffect(() => {
    const fetchVeteranData = async () => {
      setIsVeteranLoading(true);
      setVeteranError(null);
      try {
        const data = await getVeteranServices();
        setVeteranServices(data);
      } catch (e) {
        setVeteranError(e instanceof Error ? e.message : 'An unknown error occurred.');
      } finally {
        setIsVeteranLoading(false);
      }
    };

    const fetchTransportData = async () => {
        setIsTransportLoading(true);
        setTransportError(null);
        try {
            const data = await getTransportationInfo();
            setTransportation(data);
        } catch (e) {
            setTransportError(e instanceof Error ? e.message : 'An unknown error occurred.');
        } finally {
            setIsTransportLoading(false);
        }
    };
    
    // Initial search for resources tab
    if (activeTab === 'resources' && shelters.length === 0 && isLoading) {
      handleSearch(currentQuery);
    } else if (activeTab === 'veteran' && veteranServices.length === 0) {
      fetchVeteranData();
    } else if (activeTab === 'transportation' && transportation.length === 0) {
      fetchTransportData();
    }
    // This effect intentionally runs only when `activeTab` changes to fetch data for new tabs.
    // Other dependencies are omitted to prevent re-fetching on every state change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const renderShelterResults = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <LoadingSkeleton key={i} />)}
        </div>
      );
    }
    if (error) {
      return <ErrorMessage message={error} />;
    }
    if (shelters.length === 0) {
      return <EmptyState onRetry={() => handleSearch(currentQuery)} />;
    }
    return (
      <>
        {viewMode === 'map' ? (
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                <MapView shelters={shelters} apiKey={MAPS_API_KEY} />
            </div>
        ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shelters.map((shelter) => (
                    <ShelterCard key={shelter.name} shelter={shelter} />
                ))}
            </div>
        )}
        
        {sources.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Sources from Google Search:</h4>
                <ul className="space-y-2">
                    {sources.map(source => (
                        <li key={source.uri} className="text-xs">
                            <a href={source.uri} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline hover:text-blue-800 transition-colors">
                                <ExternalLinkIcon className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">{source.title || source.uri}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        )}
        
        <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 italic">
                Information is provided by AI and is intended as a guide. Please call ahead or visit official websites to confirm services and hours.
            </p>
        </div>
      </>
    );
  };
  
  const renderResourceFinder = () => (
    <>
      <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-2">Find Help in San Diego</h2>
      <p className="text-gray-600 mb-6">Enter a search term or select a category below to find resources.</p>
      <SearchBar onSearch={handleSearch} isLoading={isLoading} initialQuery={currentQuery}/>
      
      <div className="mt-6">
        <QuickCategories onSearch={handleSearch} currentQuery={currentQuery} isLoading={isLoading} />
      </div>

      <div className="mt-4 mb-6 flex justify-end">
         <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      <div className="mt-8">
        {renderShelterResults()}
      </div>
    </>
  );
  
  const renderActiveTab = () => {
    switch(activeTab) {
      case 'resources':
        return renderResourceFinder();
      case 'veteran':
        return <VeteranResources services={veteranServices} isLoading={isVeteranLoading} error={veteranError} />;
      case 'transportation':
        return <Transportation providers={transportation} isLoading={isTransportLoading} error={transportError} />;
      case 'official':
        return <OfficialResources />;
      case 'mindfulness':
        return <MindfulnessCorner />;
      case 'feedback':
        return <Feedback />;
      case 'donate':
        return <Donate />;
      default:
        return renderResourceFinder();
    }
  }

  return (
    <div className="min-h-screen text-gray-800 bg-brand-light">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
           <div className="border-b border-gray-300">
              <nav className="-mb-px flex flex-wrap gap-x-6 gap-y-2" aria-label="Tabs">
                  <TabButton onClick={() => setActiveTab('resources')} isActive={activeTab === 'resources'} ariaLabel="Find Resources">
                      <ShelterIcon className="h-5 w-5" />
                      <span>Find Resources</span>
                  </TabButton>
                  <TabButton onClick={() => setActiveTab('veteran')} isActive={activeTab === 'veteran'} ariaLabel="Veteran Resources">
                      <VeteransIcon className="h-5 w-5" />
                      <span>Veteran Resources</span>
                  </TabButton>
                  <TabButton onClick={() => setActiveTab('transportation')} isActive={activeTab === 'transportation'} ariaLabel="Transportation">
                      <BusIcon className="h-5 w-5" />
                      <span>Transportation</span>
                  </TabButton>
                  <TabButton onClick={() => setActiveTab('official')} isActive={activeTab === 'official'} ariaLabel="Official Resources">
                      <DirectoryIcon className="h-5 w-5" />
                      <span>Official Resources</span>
                  </TabButton>
                  <TabButton onClick={() => setActiveTab('mindfulness')} isActive={activeTab === 'mindfulness'} ariaLabel="Mindfulness">
                      <MindfulnessIcon className="h-5 w-5" />
                      <span>Mindfulness</span>
                  </TabButton>
                  <TabButton onClick={() => setActiveTab('feedback')} isActive={activeTab === 'feedback'} ariaLabel="Feedback">
                      <FeedbackIcon className="h-5 w-5" />
                      <span>Feedback</span>
                  </TabButton>
                   <TabButton onClick={() => setActiveTab('donate')} isActive={activeTab === 'donate'} ariaLabel="Donate">
                      <DonateIcon className="h-5 w-5" />
                      <span>Donate</span>
                  </TabButton>
              </nav>
          </div>
          <div className="mt-8">
            {renderActiveTab()}
          </div>
        </div>
      </main>
      <SOSButton />
    </div>
  );
};

export default App;
