import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { addCityMarkers } from '@/components/map/MapMarker';
import { MAP_CONFIG } from '@/config/map-constants';

export interface MapboxConfig {
  container: HTMLDivElement;
  type: 'cities' | 'planner' | 'accommodation' | 'flight' | 'accommodations' | 'booking';
}

export const useMapbox = ({ container, type }: MapboxConfig) => {
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initializationAttempted = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      try {
        if (!container) {
          console.log('Container not available yet, waiting...');
          return;
        }

        if (initializationAttempted.current) {
          console.log('Map initialization already attempted');
          return;
        }

        initializationAttempted.current = true;
        console.log('Starting map initialization with container:', container);
        setIsLoading(true);
        setError(null);

        const { data: secretData, error: secretError } = await supabase.functions.invoke('get-secrets', {
          body: { secrets: ['MAPBOX_PUBLIC_TOKEN'] }
        });

        if (secretError || !secretData?.MAPBOX_PUBLIC_TOKEN) {
          console.error('Error fetching Mapbox token:', secretError);
          throw new Error('Failed to fetch Mapbox token');
        }

        if (!isMounted) return;

        mapboxgl.accessToken = secretData.MAPBOX_PUBLIC_TOKEN;
        console.log('Mapbox token set successfully');

        // Clear existing map and markers
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
        markers.current.forEach(marker => marker.remove());
        markers.current = [];

        console.log('Creating new map instance...');
        map.current = new mapboxgl.Map({
          container,
          style: 'mapbox://styles/mapbox/light-v11',
          projection: 'globe',
          zoom: MAP_CONFIG.defaultZoom,
          center: MAP_CONFIG.defaultCenter,
          pitch: 45,
          minZoom: MAP_CONFIG.minZoom,
          maxBounds: MAP_CONFIG.maxBounds,
        });

        map.current.on('load', () => {
          if (!map.current || !isMounted) return;
          console.log('Map loaded successfully');

          initializeMapControls(map.current);
          addCityMarkers({ map: map.current, markers });

          setIsLoading(false);
        });

        map.current.on('error', (event: mapboxgl.ErrorEvent) => {
          handleMapError(new Error(event.error.message));
        });

      } catch (error: any) {
        if (isMounted) {
          handleInitializationError(error);
        }
      }
    };

    // Only initialize if we have a container
    if (container) {
      console.log('Container ready, initializing map...');
      initializeMap();
    }

    return () => {
      console.log('Cleaning up map component...');
      isMounted = false;
      cleanup();
      initializationAttempted.current = false;
    };
  }, [container, type]); // Re-run effect when container changes

  return { isLoading, error };
};

// Helper functions
const initializeMapControls = (map: mapboxgl.Map) => {
  map.addControl(
    new mapboxgl.NavigationControl({
      visualizePitch: true,
    }),
    'top-right'
  );

  map.scrollZoom.setWheelZoomRate(1/450);
  map.scrollZoom.enable();

  map.setFog({
    color: 'rgb(255, 255, 255)',
    'high-color': 'rgb(200, 200, 225)',
    'horizon-blend': 0.2,
  });
};

const handleMapError = (error: Error) => {
  console.error('Mapbox error:', error);
  toast({
    title: 'Erreur',
    description: 'Une erreur est survenue lors du chargement de la carte.',
    variant: 'destructive',
  });
};

const handleInitializationError = (error: Error) => {
  console.error('Map initialization error:', error);
  toast({
    title: 'Erreur',
    description: error.message || 'Impossible d\'initialiser la carte',
    variant: 'destructive',
  });
};

const cleanup = () => {
  // Cleanup function implementation
};
