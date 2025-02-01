import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

interface PropertyMapProps {
  latitude: number;
  longitude: number;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ latitude, longitude }) => {
  const center: LatLngExpression = [latitude, longitude];

  return (
    <div className="w-full h-96">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[latitude, longitude]}>
          <Popup>
            Property Location: {latitude.toFixed(5)}, {longitude.toFixed(5)}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
