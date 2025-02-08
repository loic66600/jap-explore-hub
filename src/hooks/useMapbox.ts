
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
  const initializationAttempts = useRef(0);
  const MAX_ATTEMPTS = 3;

  const clearMapResources = () => {
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
  };

  const setupMapControls = (mapInstance: mapboxgl.Map) => {
    mapInstance.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    mapInstance.scrollZoom.setWheelZoomRate(1/450);
    mapInstance.scrollZoom.enable();

    mapInstance.setFog({
      color: 'rgb(255, 255, 255)',
      'high-color': 'rgb(200, 200, 225)',
      'horizon-blend': 0.2,
    });
  };

  const initializeMap = async () => {
    console.log('Starting map initialization attempt:', initializationAttempts.current + 1);
    
    if (!mapContainer.current) {
      console.error('Map container not found, will retry...');
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
        throw new Error('Failed to fetch Mapbox token');
      }

      if (!secretData?.MAPBOX_PUBLIC_TOKEN) {
        console.error('Mapbox token not found in response:', secretData);
        throw new Error('Mapbox token not found');
      }

      console.log('Successfully retrieved Mapbox token');
      mapboxgl.accessToken = secretData.MAPBOX_PUBLIC_TOKEN;
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

      map.current.on('load', () => {
        if (!map.current) return;
        console.log('Map loaded successfully');
        setupMapControls(map.current);
        setIsLoading(false);
      });

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        setError('Une erreur est survenue lors du chargement de la carte');
        setIsLoading(false);
        toast({
          title: 'Erreur',
          description: 'Une erreur est survenue lors du chargement de la carte',
          variant: 'destructive',
        });
      });

    } catch (error: any) {
      console.error('Map initialization error:', error);
      setError('Impossible d\'initialiser la carte');
      setIsLoading(false);
      
      // Retry logic
      if (initializationAttempts.current < MAX_ATTEMPTS) {
        initializationAttempts.current += 1;
        console.log(`Retrying initialization (attempt ${initializationAttempts.current + 1}/${MAX_ATTEMPTS})...`);
        initializationTimeout.current = setTimeout(initializeMap, 1000);
      } else {
        toast({
          title: 'Erreur',
          description: 'Impossible d\'initialiser la carte après plusieurs tentatives',
          variant: 'destructive',
        });
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    const startInitialization = () => {
      console.log('Starting delayed map initialization...');
      if (mounted) {
        initializeMap();
      }
    };

    // Initial delay for DOM to be ready
    initializationTimeout.current = setTimeout(startInitialization, 1000);

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
