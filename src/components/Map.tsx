import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from "@/components/ui/use-toast";
import { MapPinIcon } from 'lucide-react';

// Cities data from the Cities component
const cities = [
  {
    id: 1,
    name: 'Tokyo',
    coordinates: [139.6917, 35.6866],
  },
  {
    id: 2,
    name: 'Kyoto',
    coordinates: [135.7681, 35.0116],
  },
  {
    id: 3,
    name: 'Osaka',
    coordinates: [135.5023, 34.6937],
  }
];

// Sample accommodations data
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
    name: "Ritz-Carlton Kyoto",
    coordinates: [135.7681, 35.0116],
    type: "hotel",
    price: "45000",
    rating: 4.9
  },
  {
    id: 3,
    name: "Traditional Ryokan Osaka",
    coordinates: [135.5023, 34.6937],
    type: "ryokan",
    price: "30000",
    rating: 4.8
  },
  {
    id: 4,
    name: "Capsule Hotel Shinjuku",
    coordinates: [139.7051, 35.6938],
    type: "capsule",
    price: "5000",
    rating: 4.2
  },
  {
    id: 5,
    name: "Gion Ryokan",
    coordinates: [135.7762, 35.0039],
    type: "ryokan",
    price: "35000",
    rating: 4.7
  },
  {
    id: 6,
    name: "Namba Hotel",
    coordinates: [135.5023, 34.6687],
    type: "hotel",
    price: "25000",
    rating: 4.5
  },
  {
    id: 7,
    name: "Imperial Hotel Tokyo",
    coordinates: [139.7621, 35.6731],
    type: "hotel",
    price: "55000",
    rating: 4.9
  },
  {
    id: 8,
    name: "Kyoto Tower Hotel",
    coordinates: [135.7587, 34.9875],
    type: "hotel",
    price: "20000",
    rating: 4.3
  },
  {
    id: 9,
    name: "Dotonbori Capsule",
    coordinates: [135.5023, 34.6687],
    type: "capsule",
    price: "4500",
    rating: 4.1
  },
  {
    id: 10,
    name: "Luxury Ryokan Tokyo",
    coordinates: [139.7725, 35.6846],
    type: "ryokan",
    price: "40000",
    rating: 4.8
  },
  {
    id: 11,
    name: "Business Hotel Kyoto",
    coordinates: [135.7587, 35.0116],
    type: "hotel",
    price: "15000",
    rating: 4.2
  },
  {
    id: 12,
    name: "Osaka Bay Hotel",
    coordinates: [135.4937, 34.6937],
    type: "hotel",
    price: "22000",
    rating: 4.4
  },
  {
    id: 13,
    name: "Traditional Inn Tokyo",
    coordinates: [139.7725, 35.6846],
    type: "ryokan",
    price: "28000",
    rating: 4.6
  },
  {
    id: 14,
    name: "Modern Capsule Kyoto",
    coordinates: [135.7681, 35.0116],
    type: "capsule",
    price: "4800",
    rating: 4.0
  },
  {
    id: 15,
    name: "Luxury Suite Osaka",
    coordinates: [135.5023, 34.6937],
    type: "hotel",
    price: "48000",
    rating: 4.7
  }
];

interface MapProps {
  type: 'cities' | 'accommodations' | 'booking';
}

const Map = ({ type }: MapProps) => {
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

      // Add markers based on type
      map.current.on('load', () => {
        const data = type === 'accommodations' ? accommodations : cities;
        
        data.forEach((item) => {
          // Create custom marker element
          const el = document.createElement('div');
          el.className = 'marker';
          el.innerHTML = `<div class="bg-primary p-2 rounded-full cursor-pointer hover:scale-110 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>`;

          // Create popup content based on type
          const popupContent = type === 'accommodations' 
            ? `
              <div class="p-2">
                <h3 class="font-bold">${item.name}</h3>
                <p class="text-sm">Type: ${(item as any).type}</p>
                <p class="text-sm">Prix: ${(item as any).price}¥</p>
                <p class="text-sm">Note: ${(item as any).rating}/5</p>
              </div>
            `
            : `
              <div class="p-2">
                <h3 class="font-bold">${item.name}</h3>
              </div>
            `;

          // Add popup
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(popupContent);

          // Add marker to map
          const marker = new mapboxgl.Marker(el)
            .setLngLat(item.coordinates as [number, number])
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
  }, [type]);

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
            {type === 'accommodations' 
              ? 'Explorez les hébergements au Japon'
              : type === 'booking' 
                ? 'Destinations disponibles'
                : 'Découvrez le Japon'
            }
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {type === 'accommodations'
              ? 'Découvrez nos hébergements sélectionnés et leur emplacement'
              : type === 'booking'
                ? 'Sélectionnez votre destination'
                : 'Explorez les villes principales du Japon'
            }
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