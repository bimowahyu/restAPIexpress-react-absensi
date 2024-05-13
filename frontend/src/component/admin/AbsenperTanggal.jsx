import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AbsenperTanggal = () => {
  const [absensiData, setAbsensiData] = useState([]);
  const [tanggal, setTanggal] = useState('');
  const [bulan, setBulan] = useState('');
  const [tahun, setTahun] = useState('');

  useEffect(() => {
    fetchData();
  }, [tanggal, bulan, tahun]);

  const fetchData = async () => {
    try {
      // Mengirimkan permintaan ke backend dengan tanggal, bulan, dan tahun yang dipilih
      const response = await axios.get(`http://localhost:5000/absensibulanini/get?tanggal=${tanggal}&bulan=${bulan}&tahun=${tahun}`);
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

  return (
    <div>
      <h2 className="subtitle">Data absen</h2>

      <div className="field is-grouped">
        <div className="control">
          <div className="select">
            <select onChange={(e) => setTanggal(e.target.value)}>
              <option value="">Pilih tanggal</option>
              {/* Tambahkan opsi tanggal sesuai kebutuhan */}
            </select>
          </div>
        </div>
        <div className="control">
          <div className="select">
            <select onChange={(e) => setBulan(e.target.value)}>
              <option value="">Pilih bulan</option>
              {/* Tambahkan opsi bulan sesuai kebutuhan */}
            </select>
          </div>
        </div>
        <div className="control">
          <div className="select">
            <select onChange={(e) => setTahun(e.target.value)}>
              <option value="">Pilih tahun</option>
              {/* Tambahkan opsi tahun sesuai kebutuhan */}
            </select>
          </div>
        </div>
      </div>

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

export default AbsenperTanggal;
