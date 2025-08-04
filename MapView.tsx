import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import type { Shelter } from '../types';

interface MapViewProps {
  shelters: Shelter[];
  apiKey: string;
}

const MapView: React.FC<MapViewProps> = ({ shelters, apiKey }) => {
  const [selected, setSelected] = useState<Shelter | null>(null);

  // Center of San Diego
  const position = { lat: 32.7157, lng: -117.1611 };

  if (!apiKey) {
    return <div className="h-[400px] bg-gray-200 flex items-center justify-center text-gray-500">Map API key is missing.</div>;
  }
  
  return (
    <div style={{ height: '400px', width: '100%' }} aria-label="Map showing resource locations">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={position}
          defaultZoom={11}
          mapId="619-beacon-map"
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {shelters.map((shelter) => (
            <AdvancedMarker
              key={shelter.name}
              position={{ lat: shelter.latitude, lng: shelter.longitude }}
              onClick={() => setSelected(shelter)}
              title={shelter.name}
            >
              <Pin 
                background={'#0A4F8A'} // brand-primary
                borderColor={'#023E8A'} // brand-dark
                glyphColor={'#FFFFFF'}
              />
            </AdvancedMarker>
          ))}

          {selected && (
            <InfoWindow
              position={{ lat: selected.latitude, lng: selected.longitude }}
              onCloseClick={() => setSelected(null)}
              pixelOffset={[0, -40]}
            >
              <div className="p-1 font-sans">
                <h3 className="font-bold text-base text-brand-dark">{selected.name}</h3>
                <p className="text-sm text-gray-600">{selected.address}</p>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapView;