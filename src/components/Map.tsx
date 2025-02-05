
import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapbox } from '@/hooks/useMapbox';

interface MapProps {
  type?: 'cities' | 'planner' | 'accommodation' | 'flight' | 'accommodations' | 'booking';
}

const Map = ({ type = 'cities' }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [containerReady, setContainerReady] = useState(false);

  useEffect(() => {
    if (mapContainer.current) {
      setContainerReady(true);
    }
  }, []);

  const { isLoading, error } = useMapbox({
    container: containerReady ? mapContainer.current! : null as unknown as HTMLDivElement,
    type,
  });

  if (error) {
    return (
      <div className="relative w-full h-[500px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative w-full h-[500px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Chargement de la carte...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none rounded-lg ring-1 ring-inset ring-gray-900/10" />
    </div>
  );
};

export default Map;
