import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AbsensiDetail = () => {
  const [absensiData, setAbsensiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const now = new Date();
        const bulan = now.getMonth() + 1; // Perhatikan bahwa bulan dimulai dari 0, jadi perlu ditambah 1
        const tahun = now.getFullYear();

        // Mengirimkan permintaan ke backend dengan bulan dan tahun saat ini
        const response = await axios.get(`http://localhost:5000/absensibulanini/get?bulan=${bulan}&tahun=${tahun}`);
        const data = response.data;

        // Mengonversi data absensi menjadi format yang sesuai untuk ditampilkan di tabel
        const formattedData = [];

        // Iterasi melalui data absensi
        Object.keys(data).forEach((karyawanId, index) => {
          data[karyawanId].forEach((absensi) => {
            // Mengambil nilai dari setiap absensi
            const {
              tanggal,
              jam_masuk,
              jam_keluar
            } = absensi;

            // Menambahkan data absensi ke dalam array formattedData
            formattedData.push({
              id: index + 1,
              karyawan: `Karyawan ${karyawanId}`,
              tanggal: tanggal,
              jam_masuk: jam_masuk,
              jam_keluar: jam_keluar
            });
          });
        });

        setAbsensiData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* <h1 className="title">Data Absen</h1> */}
      <h2 className="subtitle">Data absen</h2>

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Karyawan</th>
            <th>Tanggal</th>
            <th>Jam Masuk</th>
            <th>Jam Keluar</th>
          </tr>
        </thead>
        <tbody>
          {absensiData.map((absensi, index) => (
            <tr key={absensi.id}>
              <td>{index + 1}</td>
              <td>{absensi.karyawan}</td>
              <td>{absensi.tanggal}</td>
              <td>{absensi.jam_masuk ? absensi.jam_masuk : "Anda Tidak Presensi Hari Ini"}</td>
              <td>{absensi.jam_keluar ? absensi.jam_keluar : "Belum absen keluar"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AbsensiDetail;
