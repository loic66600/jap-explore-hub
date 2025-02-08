
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface UseMapboxProps {
  type?: 'cities' | 'planner' | 'accommodation' | 'flight' | 'accommodations' | 'booking';
}

export const useMapbox = ({ type = 'cities' }: UseMapboxProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initializationTimeout = useRef<NodeJS.Timeout>();
  const maxRetries = 3;
  const retryDelay = 1000;
  const retryAttempts = useRef(0);

  const clearMapResources = () => {
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
  };

  const initializeMap = async () => {
    console.log(`Attempt ${retryAttempts.current + 1}/${maxRetries} to initialize map`);

    // Check if container exists
    if (!mapContainer.current) {
      console.warn('Map container not found, waiting...');
      if (retryAttempts.current < maxRetries) {
        retryAttempts.current += 1;
        initializationTimeout.current = setTimeout(initializeMap, retryDelay);
        return;
      } else {
        setError('Could not find map container after multiple attempts');
        setIsLoading(false);
        return;
      }
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log('Fetching Mapbox token...');
      const { data: secretData, error: secretError } = await supabase.functions.invoke('get-secrets', {
        body: { secrets: ['MAPBOX_PUBLIC_TOKEN'] }
      });

      if (secretError || !secretData?.MAPBOX_PUBLIC_TOKEN) {
        throw new Error(secretError?.message || 'Failed to fetch Mapbox token');
      }

      mapboxgl.accessToken = secretData.MAPBOX_PUBLIC_TOKEN;

      // Clear existing map instance if any
      clearMapResources();

      console.log('Creating new map instance...');
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        projection: 'globe',
        zoom: 4.5,
        center: [138.2529, 36.2048],
        pitch: 45,
        minZoom: 3,
        maxBounds: [
          [120.0, 20.0],
          [150.0, 50.0]
        ],
      });

      // Setup map controls and event listeners
      map.current.on('load', () => {
        if (!map.current) return;
        
        map.current.addControl(
          new mapboxgl.NavigationControl({
            visualizePitch: true,
          }),
          'top-right'
        );

        map.current.scrollZoom.setWheelZoomRate(1/450);
        map.current.scrollZoom.enable();

        map.current.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.2,
        });

        console.log('Map loaded successfully');
        setIsLoading(false);
      });

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        setError('An error occurred while loading the map');
        setIsLoading(false);
        toast({
          title: 'Error',
          description: 'An error occurred while loading the map',
          variant: 'destructive',
        });
      });

    } catch (error: any) {
      console.error('Map initialization error:', error);
      
      if (retryAttempts.current < maxRetries) {
        console.log(`Retrying initialization (attempt ${retryAttempts.current + 1}/${maxRetries})...`);
        retryAttempts.current += 1;
        initializationTimeout.current = setTimeout(initializeMap, retryDelay);
      } else {
        setError('Failed to initialize map after multiple attempts');
        setIsLoading(false);
        toast({
          title: 'Error',
          description: 'Failed to load the map after multiple attempts',
          variant: 'destructive',
        });
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    const startInitialization = () => {
      if (mounted) {
        console.log('Starting map initialization...');
        initializeMap();
      }
    };

    // Initial delay to ensure DOM is ready
    initializationTimeout.current = setTimeout(startInitialization, 500);

    return () => {
      mounted = false;
      if (initializationTimeout.current) {
        clearTimeout(initializationTimeout.current);
      }
      clearMapResources();
    };
  }, [type]);

  return {
    mapContainer,
    map,
    isLoading,
    error,
  };
};
