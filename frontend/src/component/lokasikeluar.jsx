import React from 'react';
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const LokasiKeluar = ({ latitude, longitude }) => {
  if (latitude === null || longitude === null) {
    return null; // Jangan render jika latitude atau longitude adalah null
  }

  return (
    <MapContainer center={[latitude, longitude]} zoom={17} style={{  height: '300px', width: '300px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[latitude, longitude]}>
        <Popup>Your Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LokasiKeluar;

// import React, { useEffect, useState } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const AbsensiPage = () => {
//     const [map, setMap] = useState(null);
//     const [locationData, setLocationData] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('/backend/endpoint');
//                 const data = await response.json();
//                 setLocationData(data);
//             } catch (error) {
//                 console.error('Error fetching location data:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     useEffect(() => {
//         if (map && locationData) {
//             const { latitude, longitude, officeLocation, radius } = locationData;
            
//             // Initialize map
//             map.setView([latitude, longitude], 17);
//             L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//             // Add office location marker
//             const officeMarker = L.marker([officeLocation.latitude, officeLocation.longitude])
//                 .bindPopup('Office Location')
//                 .addTo(map);

//             // Add circle representing office radius
//             L.circle([officeLocation.latitude, officeLocation.longitude], {
//                 color: 'red',
//                 fillColor: '#f03',
//                 fillOpacity: 0.5,
//                 radius: radius
//             }).addTo(map);
//         }
//     }, [map, locationData]);

//     return (
//         <div>
//             <h1>Absensi</h1>
//             <div id="map" style={{ height: '400px' }} ref={(el) => setMap(L.map(el))}></div>
//         </div>
//     );
// };

// export default AbsensiPage;
