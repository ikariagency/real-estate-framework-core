import { useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/data/properties';
import { getPropertyCoordinates } from '@/data/zoneCoordinates';
import { useLanguage } from '@/i18n/LanguageContext';

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface PropertyMapProps {
  properties: Property[];
}

const PropertyMap = ({ properties }: PropertyMapProps) => {
  const { language } = useLanguage();
  const isEs = language === 'es' || language === 'cat';
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const markers = useMemo(() => {
    return properties
      .map(p => {
        const coords = getPropertyCoordinates(p.zone, p.slug);
        if (!coords) return null;
        return { ...p, coords };
      })
      .filter(Boolean) as (Property & { coords: { lat: number; lng: number } })[];
  }, [properties]);

  const center = useMemo(() => {
    if (markers.length === 0) return { lat: 40.4168, lng: -3.7038 };
    const avgLat = markers.reduce((s, m) => s + m.coords.lat, 0) / markers.length;
    const avgLng = markers.reduce((s, m) => s + m.coords.lng, 0) / markers.length;
    return { lat: avgLat, lng: avgLng };
  }, [markers]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up existing map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current).setView([center.lat, center.lng], 12);
    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    markers.forEach((p) => {
      const icon = L.divIcon({
        className: 'custom-price-marker',
        html: `<div style="
          background: hsl(0, 72%, 38%);
          color: white;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          border: 2px solid white;
          font-family: system-ui, sans-serif;
          cursor: pointer;
        ">${p.price}</div>`,
        iconSize: [80, 28],
        iconAnchor: [40, 28],
      });

      const title = isEs ? p.title : p.titleEn;
      const marker = L.marker([p.coords.lat, p.coords.lng], { icon }).addTo(map);

      marker.bindPopup(`
        <div style="min-width: 200px; font-family: system-ui, sans-serif;">
          <a href="/propiedad/${p.slug}" style="text-decoration: none;">
            <img src="${p.image}" alt="${title}" 
              style="width: 100%; height: 112px; object-fit: cover; border-radius: 6px; margin-bottom: 8px;" 
              loading="lazy" />
          </a>
          <a href="/propiedad/${p.slug}" style="text-decoration: none; color: inherit;">
            <h3 style="font-weight: 600; font-size: 13px; margin: 0 0 4px 0; color: #1a1a1a;">${title}</h3>
          </a>
          <p style="font-weight: 700; color: hsl(0, 72%, 38%); font-size: 13px; margin: 0 0 6px 0;">${p.price}</p>
          <div style="display: flex; gap: 12px; color: #888; font-size: 11px;">
            <span>${p.sqm} m²</span>
            <span>${p.beds} ${isEs ? 'hab' : 'bed'}</span>
            <span>${p.baths} ${isEs ? 'baños' : 'bath'}</span>
          </div>
        </div>
      `, { maxWidth: 250 });
    });

    // Fit bounds if markers exist
    if (markers.length > 0) {
      const group = L.featureGroup(
        markers.map(m => L.marker([m.coords.lat, m.coords.lng]))
      );
      map.fitBounds(group.getBounds().pad(0.1));
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [markers, center, isEs]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[500px] sm:h-[600px] lg:h-[700px] rounded-lg overflow-hidden border border-border shadow-sm"
    />
  );
};

export default PropertyMap;
