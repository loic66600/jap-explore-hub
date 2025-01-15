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

  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      if (!mapContainer.current) return;

      try {
        const { data, error } = await supabase.functions.invoke('get-secrets', {
          body: { secrets: ['MAPBOX_PUBLIC_TOKEN'] }
        });

        if (error || !data?.MAPBOX_PUBLIC_TOKEN) {
          toast({
            title: 'Erreur',
            description: 'Impossible d\'initialiser la carte. Veuillez réessayer plus tard.',
            variant: 'destructive',
          });
          throw error || new Error('Pas de token Mapbox disponible');
        }
        
        if (!isMounted) return;
        
        mapboxgl.accessToken = data.MAPBOX_PUBLIC_TOKEN;
        
        // Initialiser la carte centrée sur le Japon
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          projection: 'globe',
          zoom: 4.5,
          center: [138.2529, 36.2048], // Centre du Japon
          pitch: 45,
          minZoom: 3,
        });

        // Attendre le chargement de la carte
        map.current.on('load', () => {
          if (!map.current || !isMounted) return;

          // Ajouter les contrôles de navigation
          map.current.addControl(
            new mapboxgl.NavigationControl({
              visualizePitch: true,
            }),
            'top-right'
          );

          // Désactiver le zoom par scroll pour une meilleure expérience
          map.current.scrollZoom.disable();

          // Ajouter l'effet de brouillard
          map.current.setFog({
            color: 'rgb(255, 255, 255)',
            'high-color': 'rgb(200, 200, 225)',
            'horizon-blend': 0.2,
          });

          // Ajouter les marqueurs pour les villes
          JAPAN_CITIES.forEach(city => {
            const marker = new mapboxgl.Marker()
              .setLngLat(city.coordinates)
              .setPopup(new mapboxgl.Popup().setHTML(`<h3>${city.name}</h3>`))
              .addTo(map.current!);
            markers.current.push(marker);
          });

          // Si le type est 'accommodation' ou 'booking', charger les hôtels
          if (type === 'accommodation' || type === 'booking') {
            fetchHotels();
          }
        });

      } catch (error) {
        console.error('Erreur d\'initialisation de la carte:', error);
        if (isMounted) {
          toast({
            title: 'Erreur',
            description: 'Impossible d\'initialiser la carte. Veuillez réessayer plus tard.',
            variant: 'destructive',
          });
        }
      }
    };

    const fetchHotels = async () => {
      try {
        const { data: hotelsData } = await supabase.functions.invoke('amadeus', {
          body: {
            action: 'searchHotels',
            params: {
              cityCode: 'TYO', // Tokyo
              checkIn: '2024-02-01',
              checkOut: '2024-02-05'
            }
          }
        });

        if (hotelsData && map.current) {
          setHotels(hotelsData);
          hotelsData.forEach((hotel: any) => {
            const marker = new mapboxgl.Marker({ color: '#FF0000' })
              .setLngLat([hotel.longitude, hotel.latitude])
              .setPopup(new mapboxgl.Popup().setHTML(`
                <h3>${hotel.name}</h3>
                <p>${hotel.address}</p>
              `))
              .addTo(map.current!);
            markers.current.push(marker);
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des hôtels:', error);
      }
    };

    initializeMap();

    // Nettoyage
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

  return (
    <div className="relative w-full h-[400px]"> {/* Changé de h-screen à h-[400px] */}
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
    </div>
  );
};

export default Map;