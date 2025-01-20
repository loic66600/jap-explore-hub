import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface CustomMapProps {
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

const CustomMap = ({ type = 'cities' }: CustomMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeMap = async () => {
      if (!mapContainer.current) return;

      try {
        setIsLoading(true);
        setError(null);
        console.log('Tentative d\'initialisation de la carte...');

        const { data: secretData, error: secretError } = await supabase.functions.invoke('get-secrets', {
          body: { secrets: ['MAPBOX_PUBLIC_TOKEN'] }
        });

        if (secretError || !secretData?.MAPBOX_PUBLIC_TOKEN) {
          console.error('Erreur lors de la récupération du token Mapbox:', secretError);
          throw new Error('Impossible de récupérer le token Mapbox');
        }

        console.log('Token Mapbox récupéré avec succès');

        if (!isMounted) return;

        mapboxgl.accessToken = secretData.MAPBOX_PUBLIC_TOKEN;

        // Nettoyage des ressources existantes
        if (map.current) {
          map.current.remove();
          map.current = null;
        }

        markers.current.forEach(marker => marker.remove());
        markers.current = [];

        // Initialisation de la nouvelle carte
        console.log('Création de la carte...');
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          projection: 'globe',
          zoom: 4.5,
          center: [138.2529, 36.2048], // Centre sur le Japon
          pitch: 45,
          minZoom: 3,
          maxBounds: [
            [120.0, 20.0], // Coordonnées Sud-Ouest
            [150.0, 50.0]  // Coordonnées Nord-Est
          ],
        });

        // Gestion des événements de la carte
        map.current.on('load', () => {
          if (!map.current || !isMounted) return;
          console.log('Carte chargée avec succès');

          // Ajout des contrôles de navigation
          map.current.addControl(
            new mapboxgl.NavigationControl({
              visualizePitch: true,
            }),
            'top-right'
          );

          // Configuration du zoom
          map.current.scrollZoom.setWheelZoomRate(1/450);
          map.current.scrollZoom.enable();

          // Ajout des effets visuels
          map.current.setFog({
            color: 'rgb(255, 255, 255)',
            'high-color': 'rgb(200, 200, 225)',
            'horizon-blend': 0.2,
          });

          // Ajout des marqueurs pour les villes
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
          console.error('Erreur Mapbox:', e);
          setError('Une erreur est survenue lors du chargement de la carte');
          setIsLoading(false);
          toast({
            title: 'Erreur',
            description: 'Problème lors du chargement de la carte',
            variant: 'destructive',
          });
        });

      } catch (error: any) {
        console.error('Erreur d\'initialisation de la carte:', error);
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

    initializeMap();

    return () => {
      isMounted = false;
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

export default CustomMap;