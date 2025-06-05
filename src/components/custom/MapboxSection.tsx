'use client';

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// IMPORTANT: Replace with your actual Mapbox access token
const MAPBOX_ACCESS_TOKEN: string = 'pk.eyJ1Ijoid2Vic3RhcnN0dWRpbyIsImEiOiJjbWJqaXUyZG8wZ3BtMmpxNm5pcGw0Y2ptIn0.UnohoPp9qrhIFOEoQ9FNfg'; // User has configured this

interface MapboxSectionProps {
  initialLng?: number;
  initialLat?: number;
  initialZoom?: number;
  mapStyle?: string;
}

const MapboxSection: React.FC<MapboxSectionProps> = ({
  initialLng = -74.5,
  initialLat = 40,
  initialZoom = 9,
  mapStyle = 'mapbox://styles/mapbox/streets-v12',
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null); // To store the map instance
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (MAPBOX_ACCESS_TOKEN === 'YOUR_MAPBOX_ACCESS_TOKEN') {
      console.error(
        'Mapbox Access Token is not set. Please replace "YOUR_MAPBOX_ACCESS_TOKEN" in MapboxSection.tsx'
      );
      return;
    }

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    // Prevent map from re-initializing
    if (mapRef.current || !mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // container ID or HTML element
      style: mapStyle, // style URL
      center: [initialLng, initialLat], // starting position [lng, lat]
      zoom: initialZoom, // starting zoom
    });

    mapRef.current = map; // Store the map instance

    map.on('load', () => {
      setMapLoaded(true);
      // Add navigation control (zoom buttons, compass)
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Example: Add a marker at the center
      new mapboxgl.Marker()
        .setLngLat([initialLng, initialLat])
        .addTo(map);
    });

    // Clean up on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null; 
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLng, initialLat, initialZoom, mapStyle]); // Rerun effect if these props change

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12 text-neutral-800">
          Our Location
        </h2>
        {MAPBOX_ACCESS_TOKEN === 'YOUR_MAPBOX_ACCESS_TOKEN' && (
          <div className="text-center p-4 bg-red-100 text-red-700 rounded-md">
            Map is not configured. Please provide a valid Mapbox Access Token.
          </div>
        )}
        <div 
          ref={mapContainerRef} 
          className="map-container h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-lg shadow-xl overflow-hidden relative"
        >
          {!mapLoaded && MAPBOX_ACCESS_TOKEN !== 'YOUR_MAPBOX_ACCESS_TOKEN' && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-200">
              <p className="text-neutral-500">Loading map...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MapboxSection; 