import React from 'react';

const LocationMap = ({ latitude, longitude }) => {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.005},${latitude - 0.005},${longitude + 0.005},${latitude + 0.005}&layer=mapnik`;

  return (
    <div>
      <h2>Lokasi Anda</h2>
      <iframe
        title="Peta Lokasi"
        width="600"
        height="450"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={mapUrl}
      ></iframe>
    </div>
  );
};

export default LocationMap;

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
