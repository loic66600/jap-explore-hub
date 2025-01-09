import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from "@/components/ui/use-toast";
import { MapPinIcon } from 'lucide-react';

// Données des hébergements (à remplacer par des données réelles de votre API)
const accommodations = [
  {
    id: 1,
    name: "Park Hyatt Tokyo",
    coordinates: [139.6917, 35.6866],
    type: "hotel",
    price: "50000",
    rating: 5
  },
  {
    id: 2,
    name: "Traditional Ryokan Kyoto",
    coordinates: [135.7681, 35.0116],
    type: "ryokan",
    price: "30000",
    rating: 4.8
  },
  {
    id: 3,
    name: "Capsule Hotel Osaka",
    coordinates: [135.5023, 34.6937],
    type: "capsule",
    price: "5000",
    rating: 4.2
  }
];

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = 'pk.eyJ1IjoibG9pYzY2IiwiYSI6ImNsejZ4NDB6bTAzYWMyaXNhM3A2bjN4Mm8ifQ.2om2iGQerqXcK2yiDuO_SQ';
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [139.6503, 35.6762],
        zoom: 5
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add markers for each accommodation
      map.current.on('load', () => {
        accommodations.forEach((accommodation) => {
          // Create custom marker element
          const el = document.createElement('div');
          el.className = 'marker';
          el.innerHTML = `<div class="bg-primary p-2 rounded-full cursor-pointer hover:scale-110 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>`;

          // Create popup
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-bold">${accommodation.name}</h3>
                <p class="text-sm">Type: ${accommodation.type}</p>
                <p class="text-sm">Prix: ${accommodation.price}¥</p>
                <p class="text-sm">Note: ${accommodation.rating}/5</p>
              </div>
            `);

          // Add marker to map
          const marker = new mapboxgl.Marker(el)
            .setLngLat(accommodation.coordinates)
            .setPopup(popup)
            .addTo(map.current!);

          markers.current.push(marker);
        });
      });
      
      toast({
        title: "Carte initialisée",
        description: "La carte a été chargée avec succès",
      });

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Erreur lors de l'initialisation de la carte.",
      });
      console.error('Map initialization error:', error);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      markers.current.forEach(marker => marker.remove());
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <section id="map" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
            Explorez les hébergements au Japon
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos hébergements sélectionnés et leur emplacement
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