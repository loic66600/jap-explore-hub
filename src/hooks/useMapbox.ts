
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
  const [attempt, setAttempt] = useState(0);
  const maxAttempts = 5;
  const retryDelay = 500;

  const clearMapResources = () => {
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
  };

  const initializeMap = async () => {
    console.log(`Initializing map - Attempt ${attempt + 1}/${maxAttempts}`);

    // Check if container exists
    if (!mapContainer.current) {
      console.warn('Map container not found');
      if (attempt < maxAttempts) {
        setAttempt(prev => prev + 1);
        setTimeout(() => initializeMap(), retryDelay);
      } else {
        setError('Could not find map container after multiple attempts');
        setIsLoading(false);
        toast({
          title: 'Error',
          description: 'Failed to initialize map - container not found',
          variant: 'destructive',
        });
      }
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log('Fetching Mapbox token...');
      const { data: secretData, error: secretError } = await supabase.functions.invoke('get-secrets', {
        body: { secrets: ['MAPBOX_PUBLIC_TOKEN'] }
      });

      if (secretError) {
        console.error('Error fetching Mapbox token:', secretError);
        throw new Error(secretError.message || 'Failed to fetch Mapbox token');
      }

      if (!secretData?.MAPBOX_PUBLIC_TOKEN) {
        console.error('No Mapbox token received');
        throw new Error('No Mapbox token received from server');
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
      setError(error.message || 'Failed to initialize map');
      setIsLoading(false);
      toast({
        title: 'Error',
        description: error.message || 'Failed to initialize map',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      console.log('Starting map initialization...');
      initializeMap();
    }

    return () => {
      mounted = false;
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
