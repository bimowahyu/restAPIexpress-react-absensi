import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet'; 
import axios from 'axios'; // Tambahkan axios untuk mengambil data
import markerIcon from './marker2.png'; 

const Lokasi = ({ latitude, longitude }) => {
  const [radius, setRadius] = useState(null); // Tambahkan state untuk radius

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cabang'); // Ganti URL dengan endpoint yang sesuai
        const { radius } = response.data; // Asumsikan bahwa nilai radius ada di dalam data cabang yang diterima
        setRadius(radius);
      } catch (error) {
        console.error('Error fetching branch data:', error);
      }
    };

    fetchBranchData();
  }, []);

  if (latitude === null || longitude === null) {
    return null;
  }

  const customMarkerIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [25, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [0, -41] 
  });

  return (
    <MapContainer center={[latitude, longitude]} zoom={17} style={{ height: '300px', width: '300px' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={customMarkerIcon}>
        <Popup>Your Location</Popup>
      </Marker>
      {radius && (
        <Circle
          center={[latitude, longitude]}
          radius={radius}
          color='blue'
          fillColor='#f03'
          fillOpacity={0.5}
        />
      )}
    </MapContainer>
  );
};

export default Lokasi;
