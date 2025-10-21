
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { mockCities } from '@/fixtures/cities';
import { mockHotels } from '@/fixtures/hotels';

interface UseMapboxProps {
  type?: 'cities' | 'planner' | 'accommodation' | 'flight' | 'accommodations' | 'booking';
}

export const useMapbox = ({ type = 'cities' }: UseMapboxProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const cachedToken = useRef<string | null>(null);
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

  const addMarkers = () => {
    if (!map.current) return;

    if (type === 'cities' || type === 'planner') {
      mockCities.forEach((city) => {
        // Couleur différente pour le planificateur
        const markerColor = type === 'planner' ? '#F97316' : '#9b87f5';

        const marker = new mapboxgl.Marker({
          color: markerColor
        })
          .setLngLat([city.coordinates.longitude, city.coordinates.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(`
            <div class="p-2">
              <h3 class="font-bold">${city.name}</h3>
              <p class="text-sm">${city.description}</p>
              ${type === 'planner' ? `
                <div class="mt-2">
                  <p class="text-xs font-semibold">Attractions principales:</p>
                  <ul class="text-xs list-disc list-inside">
                    ${city.mainAttractions.map(attraction => `<li>${attraction}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
          `))
          .addTo(map.current!);
        
        markers.current.push(marker);
      });
    } else if (type === 'accommodations' || type === 'accommodation') {
      const cityCoordinates: Record<string, { latitude: number; longitude: number }> = {
        'Tokyo': { latitude: 35.6762, longitude: 139.6503 },
        'Kyoto': { latitude: 35.0116, longitude: 135.7681 },
        'Osaka': { latitude: 34.6937, longitude: 135.5023 },
        'Nara': { latitude: 34.6851, longitude: 135.8048 },
        'Sapporo': { latitude: 43.0618, longitude: 141.3545 },
        'Hiroshima': { latitude: 34.3853, longitude: 132.4553 }
      };

      const offsets = [
        { lat: 0.01, lng: 0.01 },
        { lat: -0.01, lng: -0.01 },
        { lat: 0.01, lng: -0.01 },
        { lat: -0.01, lng: 0.01 }
      ];

      mockHotels.forEach((hotel, index) => {
        const cityName = hotel.hotel.address?.cityName;
        if (!cityName) {
          console.warn('Hotel without city information found');
          return;
        }

        const coordinates = cityCoordinates[cityName];

        if (!coordinates) {
          console.warn(`No coordinates found for city ${cityName}`);
          return;
        }

        const offset = offsets[index % offsets.length];
        const primaryOffer = hotel.offers[0];
        const distance = hotel.hotel.hotelDistance?.distance;
        const distanceLabel = typeof distance === 'number' ? `${distance.toFixed(1)} km du centre` : 'Distance inconnue';

        const marker = new mapboxgl.Marker({
          color: '#F97316'
        })
          .setLngLat([
            coordinates.longitude + offset.lng,
            coordinates.latitude + offset.lat
          ])
          .setPopup(new mapboxgl.Popup().setHTML(`
            <div class="p-2">
              <h3 class="font-bold">${hotel.hotel.name}</h3>
              <p class="text-sm">${distanceLabel}</p>
              ${primaryOffer ? `<p class="text-sm font-semibold">À partir de ${primaryOffer.price.total} ${primaryOffer.price.currency}</p>` : ''}
            </div>
          `))
          .addTo(map.current!);

        markers.current.push(marker);
      });
    }
  };

  const getTokenFromEnv = () => {
    const env = import.meta.env as Record<string, string | undefined>;
    const possibleKeys = [
      'VITE_MAPBOX_PUBLIC_TOKEN',
      'VITE_MAPBOX_TOKEN',
      'PUBLIC_MAPBOX_PUBLIC_TOKEN',
      'PUBLIC_MAPBOX_TOKEN',
      'MAPBOX_PUBLIC_TOKEN',
    ];

    for (const key of possibleKeys) {
      const value = env[key];
      if (value && value.trim().length > 0) {
        console.log(`Using Mapbox token from environment variable ${key}`);
        return value;
      }
    }

    return null;
  };

  const fetchMapboxToken = async () => {
    if (cachedToken.current) {
      return cachedToken.current;
    }

    const envToken = getTokenFromEnv();
    if (envToken) {
      cachedToken.current = envToken;
      return envToken;
    }

    console.log('Fetching Mapbox token from Supabase function...');
    const { data: secretData, error: secretError } = await supabase.functions.invoke('get-secrets', {
      body: { secrets: ['MAPBOX_PUBLIC_TOKEN'] }
    });

    if (secretError) {
      console.error('Error fetching Mapbox token from Supabase:', secretError);
      throw new Error(secretError.message || 'Failed to fetch Mapbox token');
    }

    if (!secretData?.MAPBOX_PUBLIC_TOKEN) {
      console.error('No Mapbox token received from Supabase function');
      throw new Error('No Mapbox token received from server');
    }

    cachedToken.current = secretData.MAPBOX_PUBLIC_TOKEN;
    return secretData.MAPBOX_PUBLIC_TOKEN;
  };

  const initializeMap = async () => {
    console.log(`Initializing map - Attempt ${attempt + 1}/${maxAttempts}`);

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

      const mapboxToken = await fetchMapboxToken();

      if (!mapboxToken) {
        throw new Error('Aucun jeton Mapbox disponible. Vérifiez votre configuration.');
      }

      mapboxgl.accessToken = mapboxToken;

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

        addMarkers();

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
