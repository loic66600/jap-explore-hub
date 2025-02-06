
import React from 'react';
import mapboxgl from 'mapbox-gl';
import { JAPAN_CITIES } from '@/config/map-constants';

interface MapMarkerProps {
  map: mapboxgl.Map;
  markers: React.MutableRefObject<mapboxgl.Marker[]>;
}

export const addCityMarkers = ({ map, markers }: MapMarkerProps) => {
  JAPAN_CITIES.forEach(city => {
    if (!map) return;
    
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
      .addTo(map);

    marker.getElement().addEventListener('mouseenter', () => popup.addTo(map));
    marker.getElement().addEventListener('mouseleave', () => popup.remove());
    
    markers.current.push(marker);
  });
};
