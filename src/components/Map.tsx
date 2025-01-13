import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface MapProps {
  type?: 'cities' | 'planner' | 'accommodation' | 'flight' | 'accommodations' | 'booking';
}

const Map = ({ type = 'cities' }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapContainer.current) return;

      try {
        // Get the Mapbox token from Supabase Edge Function secrets
        const { data, error } = await supabase.functions.invoke('get-secrets', {
          body: { secrets: ['MAPBOX_PUBLIC_TOKEN'] }
        });

        if (error) {
          toast({
            title: 'Error',
            description: 'Failed to initialize map. Please try again later.',
            variant: 'destructive',
          });
          throw error;
        }
        
        mapboxgl.accessToken = data.MAPBOX_PUBLIC_TOKEN;
        
        // Initialize map with default options
        const mapOptions: mapboxgl.MapOptions = {
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          projection: 'globe',
          zoom: 1.5,
          center: [30, 15],
          pitch: 45,
          minZoom: 1,
        };

        map.current = new mapboxgl.Map(mapOptions);

        // Add navigation controls
        map.current.addControl(
          new mapboxgl.NavigationControl({
            visualizePitch: true,
          }),
          'top-right'
        );

        // Disable scroll zoom for smoother experience
        map.current.scrollZoom.disable();

        // Wait for map to load before adding effects and starting animation
        map.current.on('load', () => {
          if (!map.current) return;

          map.current.setFog({
            color: 'rgb(255, 255, 255)',
            'high-color': 'rgb(200, 200, 225)',
            'horizon-blend': 0.2,
          });

          startGlobeAnimation();
        });

      } catch (error) {
        console.error('Error initializing map:', error);
        toast({
          title: 'Error',
          description: 'Failed to initialize map. Please try again later.',
          variant: 'destructive',
        });
      }
    };

    const startGlobeAnimation = () => {
      if (!map.current) return;

      const secondsPerRevolution = 240;
      const maxSpinZoom = 5;
      const slowSpinZoom = 3;
      let userInteracting = false;
      let spinEnabled = true;

      // Spin globe function
      const spinGlobe = () => {
        if (!map.current || !spinEnabled || userInteracting) return;
        
        const zoom = map.current.getZoom();
        if (zoom < maxSpinZoom) {
          let distancePerSecond = 360 / secondsPerRevolution;
          if (zoom > slowSpinZoom) {
            const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
            distancePerSecond *= zoomDif;
          }
          const center = map.current.getCenter();
          center.lng -= distancePerSecond;
          map.current.easeTo({ center, duration: 1000, easing: (n) => n });
        }
        animationFrameId.current = requestAnimationFrame(spinGlobe);
      };

      // Event listeners for interaction
      map.current.on('mousedown', () => {
        userInteracting = true;
      });
      
      map.current.on('dragstart', () => {
        userInteracting = true;
      });
      
      map.current.on('mouseup', () => {
        userInteracting = false;
      });
      
      map.current.on('touchend', () => {
        userInteracting = false;
      });

      // Start the animation
      spinGlobe();
    };

    initializeMap();

    // Cleanup function
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
    </div>
  );
};

export default Map;