
export const JAPAN_CITIES = [
  { name: 'Tokyo', coordinates: [139.6917, 35.6895] as [number, number] },
  { name: 'Osaka', coordinates: [135.5023, 34.6937] as [number, number] },
  { name: 'Kyoto', coordinates: [135.7681, 35.0116] as [number, number] },
  { name: 'Sapporo', coordinates: [141.3545, 43.0618] as [number, number] },
  { name: 'Fukuoka', coordinates: [130.4017, 33.5902] as [number, number] },
  { name: 'Nara', coordinates: [135.8048, 34.6851] as [number, number] },
  { name: 'Hiroshima', coordinates: [132.4553, 34.3853] as [number, number] }
];

export const MAP_CONFIG = {
  defaultZoom: 4.5,
  defaultCenter: [138.2529, 36.2048] as [number, number],
  minZoom: 3,
  maxBounds: [
    [120.0, 20.0], // Southwest coordinates
    [150.0, 50.0]  // Northeast coordinates
  ] as [[number, number], [number, number]],
};
