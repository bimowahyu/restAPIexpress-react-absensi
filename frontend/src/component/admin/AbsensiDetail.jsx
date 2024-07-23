import React from 'react';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then(res => res.data);

const AbsensiDetail = () => {
  const now = new Date();
  const bulan = now.getMonth() + 1; 
  const tahun = now.getFullYear();

  const { data, error } = useSWR(`http://localhost:5000/absensibulanini/get?bulan=${bulan}&tahun=${tahun}`, fetcher, {
    refreshInterval: 5000 // Polling setiap 5 detik
  });

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  // Mengonversi data absensi menjadi format yang sesuai untuk ditampilkan di tabel
  const formattedData = [];

  // Iterasi melalui data absensi
  data.forEach((karyawanData, karyawanIndex) => {
    karyawanData.absensi.forEach((absensi, absensiIndex) => {
      // Menambahkan data absensi ke dalam array formattedData
      formattedData.push({
        id: `${karyawanIndex + 1}-${absensiIndex + 1}`,
        karyawan: karyawanData.nama,
        tanggal: absensi.tanggal,
        jam_masuk: absensi.jam_masuk,
        jam_keluar: absensi.jam_keluar
      });
    });
  });

  return (
    <div>
      <h2 className="subtitle">Data Absen</h2>
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
          {formattedData.map((absensi, index) => (
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
