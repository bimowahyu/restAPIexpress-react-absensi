import React, { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet'; 
import axios from 'axios';
import markerIcon from './marker2.png'; 

const Lokasi = ({ latitude, longitude }) => {
  const [branchData, setBranchData] = useState(null);

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cabang');
        const data = response.data.find(branch => branch.nama_cabang === "testcabang10km"); 
        setBranchData(data);
      } catch (error) {
        console.error('Error fetching branch data:', error);
      }
    };

    fetchBranchData();
  }, []);

  if (!branchData || latitude === null || longitude === null) {
    return null;
  }

  const [lang_kantor, long_kantor] = branchData.lokasi_kantor.split(',');
  const radius = branchData.radius;

  const customMarkerIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [25, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [0, -41] 
  });

  return (
    <MapContainer center={[latitude, longitude]} zoom={17} style={{ height: '300px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={customMarkerIcon}>
        <Popup>Your Location</Popup>
      </Marker>
      <Circle
        center={[lang_kantor, long_kantor]}
        radius={radius}
        color='red'
        fillColor='#f03'
        fillOpacity={0.5}
      />
    </MapContainer>
  );
};

export default Lokasi;
