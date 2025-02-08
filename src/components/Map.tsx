
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface MapProps {
  type?: 'cities' | 'planner' | 'accommodation' | 'flight' | 'accommodations' | 'booking';
}

const JAPAN_CITIES = [
  { name: 'Tokyo', coordinates: [139.6917, 35.6895] as [number, number] },
  { name: 'Osaka', coordinates: [135.5023, 34.6937] as [number, number] },
  { name: 'Kyoto', coordinates: [135.7681, 35.0116] as [number, number] },
  { name: 'Sapporo', coordinates: [141.3545, 43.0618] as [number, number] },
  { name: 'Fukuoka', coordinates: [130.4017, 33.5902] as [number, number] },
  { name: 'Nara', coordinates: [135.8048, 34.6851] as [number, number] },
  { name: 'Hiroshima', coordinates: [132.4553, 34.3853] as [number, number] }
];

const Map = ({ type = 'cities' }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const initializationTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      console.log('Starting map initialization...');
      if (!mapContainer.current) {
        console.error('Map container not found, waiting for DOM...');
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Fetching Mapbox token from Supabase...');
        const { data: secretData, error: secretError } = await supabase.functions.invoke('get-secrets', {
          body: { secrets: ['MAPBOX_PUBLIC_TOKEN'] }
        });

        console.log('Secret response:', { data: secretData, error: secretError });

        if (secretError) {
          console.error('Error fetching Mapbox token:', secretError);
          throw new Error('Failed to fetch Mapbox token');
        }

        if (!secretData?.MAPBOX_PUBLIC_TOKEN) {
          console.error('Mapbox token not found in response');
          throw new Error('Mapbox token not found');
        }

        if (!isMounted) {
          console.log('Component unmounted, stopping initialization');
          return;
        }

        console.log('Initializing Mapbox with token...');
        mapboxgl.accessToken = secretData.MAPBOX_PUBLIC_TOKEN;

        // Clear any existing map instance
        if (map.current) {
          console.log('Removing existing map instance');
          map.current.remove();
          map.current = null;
        }

        // Clear existing markers
        markers.current.forEach(marker => marker.remove());
        markers.current = [];

        console.log('Creating new map instance...');
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          projection: 'globe',
          zoom: 4.5,
          center: [138.2529, 36.2048], // Center on Japan
          pitch: 45,
          minZoom: 3,
          maxBounds: [
            [120.0, 20.0], // Southwest coordinates
            [150.0, 50.0]  // Northeast coordinates
          ],
        });

        map.current.on('load', () => {
          if (!map.current || !isMounted) return;
          console.log('Map loaded successfully');

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

          // Add markers for cities with custom popup
          JAPAN_CITIES.forEach(city => {
            if (!map.current) return;
            
            const popup = new mapboxgl.Popup({
              closeButton: false,
              closeOnClick: false,
              className: 'custom-popup'
            }).setHTML(`
              <div class="bg-white p-2 rounded-lg shadow-lg">
                <h3 class="font-semibold text-sm">${city.name}</h3>
              </div>
            `);

            const marker = new mapboxgl.Marker({
              color: '#ea384c',
              scale: 0.8
            })
              .setLngLat(city.coordinates)
              .setPopup(popup)
              .addTo(map.current);

            marker.getElement().addEventListener('mouseenter', () => popup.addTo(map.current!));
            marker.getElement().addEventListener('mouseleave', () => popup.remove());
            
            markers.current.push(marker);
          });

          setIsLoading(false);
        });

        map.current.on('error', (e) => {
          console.error('Mapbox error:', e);
          setError('Une erreur est survenue lors du chargement de la carte');
          setIsLoading(false);
          toast({
            title: 'Erreur',
            description: 'Une erreur est survenue lors du chargement de la carte. Veuillez réessayer.',
            variant: 'destructive',
          });
        });

      } catch (error: any) {
        console.error('Map initialization error:', error);
        if (isMounted) {
          setError('Impossible d\'initialiser la carte');
          setIsLoading(false);
          toast({
            title: 'Erreur',
            description: error.message || 'Impossible d\'initialiser la carte',
            variant: 'destructive',
          });
        }
      }
    };

    // Add a small delay before initialization to ensure DOM is ready
    initializationTimeout.current = setTimeout(() => {
      console.log('Starting delayed map initialization...');
      initializeMap();
    }, 500);

    return () => {
      console.log('Cleaning up map component...');
      isMounted = false;
      if (initializationTimeout.current) {
        clearTimeout(initializationTimeout.current);
      }
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [type]);

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
