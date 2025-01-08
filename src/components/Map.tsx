import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const initializeMap = () => {
    if (!mapContainer.current || !token) return;

    try {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [139.6503, 35.6762], // Tokyo coordinates
        zoom: 5
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      setIsMapInitialized(true);
      toast({
        title: "Carte initialisée",
        description: "La carte a été chargée avec succès",
      });

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'initialiser la carte. Vérifiez votre token Mapbox.",
      });
      console.error('Map initialization error:', error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  if (!isMapInitialized) {
    return (
      <section id="map" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Explorez le Japon
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Pour afficher la carte interactive, veuillez entrer votre token Mapbox
            </p>
            <div className="flex gap-4 justify-center items-center max-w-md mx-auto">
              <Input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Entrez votre token Mapbox"
                className="flex-1"
              />
              <Button onClick={initializeMap}>
                Initialiser la carte
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="map" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Explorez le Japon
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les lieux incontournables et planifiez votre itinéraire
          </p>
        </div>
        
        <div className="relative h-[600px] rounded-xl overflow-hidden shadow-lg">
          <div ref={mapContainer} className="absolute inset-0" />
        </div>
      </div>
    </section>
  );
};

export default Map;