import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface MapProps {
  type?: 'cities' | 'planner' | 'accommodation' | 'flight' | 'accommodations' | 'booking';
}

// Coordonnées des principales villes japonaises
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
  const animationFrameId = useRef<number | null>(null);
  const [hotels, setHotels] = useState<any[]>([]);
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      if (!mapContainer.current) return;

      try {
        // First try to get the token
        const { data: secretData, error: secretError } = await supabase.functions.invoke('get-secrets', {
          body: { secrets: ['MAPBOX_PUBLIC_TOKEN'] }
        });

        if (secretError) {
          console.error('Error fetching Mapbox token:', secretError);
          throw new Error('Failed to fetch Mapbox token');
        }

        if (!secretData?.MAPBOX_PUBLIC_TOKEN) {
          throw new Error('Mapbox token not found');
        }

        if (!isMounted) return;

        setMapboxToken(secretData.MAPBOX_PUBLIC_TOKEN);
        mapboxgl.accessToken = secretData.MAPBOX_PUBLIC_TOKEN;

        // Initialize the map
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          projection: 'globe',
          zoom: 4.5,
          center: [138.2529, 36.2048],
          pitch: 45,
          minZoom: 3,
        });

        // Wait for map to load
        map.current.on('load', () => {
          if (!map.current || !isMounted) return;

          map.current.addControl(
            new mapboxgl.NavigationControl({
              visualizePitch: true,
            }),
            'top-right'
          );

          map.current.scrollZoom.disable();

          map.current.setFog({
            color: 'rgb(255, 255, 255)',
            'high-color': 'rgb(200, 200, 225)',
            'horizon-blend': 0.2,
          });

          // Add markers for cities
          JAPAN_CITIES.forEach(city => {
            if (!map.current) return;
            const marker = new mapboxgl.Marker()
              .setLngLat(city.coordinates)
              .setPopup(new mapboxgl.Popup().setHTML(`<h3>${city.name}</h3>`))
              .addTo(map.current);
            markers.current.push(marker);
          });

          // Load hotels if needed
          if (type === 'accommodation' || type === 'booking') {
            fetchHotels();
          }
        });

      } catch (error) {
        console.error('Map initialization error:', error);
        toast({
          title: 'Erreur',
          description: 'Impossible d\'initialiser la carte. Veuillez réessayer plus tard.',
          variant: 'destructive',
        });
      }
    };

    const fetchHotels = async () => {
      try {
        const { data: hotelsData, error: hotelsError } = await supabase.functions.invoke('amadeus', {
          body: {
            action: 'searchHotels',
            params: {
              cityCode: 'TYO',
              checkIn: '2024-02-01',
              checkOut: '2024-02-05'
            }
          }
        });

        if (hotelsError) {
          console.error('Error fetching hotels:', hotelsError);
          return;
        }

        if (hotelsData?.data && map.current) {
          setHotels(hotelsData.data);
          hotelsData.data.forEach((hotel: any) => {
            if (hotel.hotel && hotel.hotel.latitude && hotel.hotel.longitude) {
              const marker = new mapboxgl.Marker({ color: '#FF0000' })
                .setLngLat([hotel.hotel.longitude, hotel.hotel.latitude])
                .setPopup(new mapboxgl.Popup().setHTML(`
                  <h3>${hotel.hotel.name}</h3>
                  <p>${hotel.hotel.address?.cityName || ''}</p>
                `))
                .addTo(map.current!);
              markers.current.push(marker);
            }
          });
        }
      } catch (error) {
        console.error('Error loading hotels:', error);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les hôtels. Veuillez réessayer plus tard.',
          variant: 'destructive',
        });
      }
    };

    initializeMap();

    return () => {
      isMounted = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      markers.current.forEach(marker => marker.remove());
      markers.current = [];
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [type]);

  if (!mapboxToken) {
    return (
      <div className="relative w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Chargement de la carte...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
    </div>
  );
};

export default Map;