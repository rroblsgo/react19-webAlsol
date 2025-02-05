import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

interface PropertyMapProps {
  latitud: number;
  longitud: number;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ latitud, longitud }) => {
  const center: LatLngExpression = [latitud, longitud];

  return (
    <div className="w-full h-96">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[latitud, longitud]}>
          <Popup>
            Property Location: {latitud.toFixed(5)}, {longitud.toFixed(5)}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
