import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocationDisplay from './location';
import LokasiKeluar from './lokasikeluar';
import moment from 'moment-timezone'; 
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const AbsensiPage = () => {
  const [absensiData, setAbsensiData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbsensiData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/absensi/get');
        setAbsensiData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAbsensiData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!absensiData) {
    return <div>Loading...</div>;
  }

  const parseCoordinates = (lokasiString) => {
    if (!lokasiString) {
      return { latitude: null, longitude: null }; // Return null jika lokasiString adalah null atau undefined
    }
    
    const [latitude, longitude] = lokasiString.split(',');
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
    return { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
  };
  const { lokasi, absensiHariIni } = absensiData;
  if (!absensiHariIni) {
    return <div>Anda belum absen hari ini.</div>;
  }
  const { latitude: latitudeMasuk, longitude: longitudeMasuk } = parseCoordinates(absensiHariIni.lokasi_masuk);
  const { latitude: latitudeKeluar, longitude: longitudeKeluar } = parseCoordinates(absensiHariIni.lokasi_keluar);

  return (
    <div>
      <h1>Data Absensi Hari Ini</h1>
      {absensiHariIni && (
        
        <div>
          <p>Tanggal: {absensiHariIni.tgl_absensi}</p>
          <p>Jam Masuk: {absensiHariIni.jam_masuk}</p>
          <p>Jam Keluar: {absensiHariIni.jam_keluar || '-'}</p>
          <p>Lokasi Masuk: {absensiHariIni.lokasi_masuk}
          <LocationDisplay latitude={latitudeMasuk} longitude={longitudeMasuk} />
       </p>
          <p>Lokasi Keluar: {absensiHariIni.lokasi_keluar || '-'}
          <LokasiKeluar latitude={latitudeKeluar} longitude={longitudeKeluar} />
         </p>
         
         
        </div>
      )}
      <h2>Data Lokasi</h2>
      {lokasi && (
        <div>
          <p>Nama Cabang: {lokasi.nama_cabang}</p>
          <p>Lokasi Kantor: {lokasi.lokasi_kantor}</p>
          <p>Radius: {lokasi.radius}</p>
        </div>
      )}
    </div>
  );
};

export default AbsensiPage;
