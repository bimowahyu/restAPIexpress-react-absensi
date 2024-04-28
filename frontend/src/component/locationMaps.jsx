import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';

const LocationMap = ({ latitude, longitude, radius }) => {
  if (latitude === null || longitude === null) {
    return null; // Jangan render jika latitude atau longitude adalah null
  }

  return (
    <MapContainer center={[latitude, longitude]} zoom={17} style={{ height: '200px', width: '200px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]}>
        <Popup>Lokasi Anda</Popup>
      </Marker>
      {radius && (
        <Circle center={[latitude, longitude]} radius={radius} />
      )}
    </MapContainer>
  );
};

export default LocationMap;
