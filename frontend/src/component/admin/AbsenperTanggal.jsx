import React, { useState } from 'react';
import axios from 'axios';
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then(res => res.data);

const AbsenperTanggal = () => {
  const [tanggal, setTanggal] = useState('');
  const [bulan, setBulan] = useState('');
  const [tahun, setTahun] = useState('');

  const { data, error } = useSWR(
    `http://localhost:5000/absensibulanini/get?tanggal=${tanggal}&bulan=${bulan}&tahun=${tahun}`, 
    fetcher,
    { refreshInterval: 5000 }  // Polling setiap 5 detik
  );

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  const formattedData = [];
  Object.keys(data).forEach((karyawanId, index) => {
    data[karyawanId].forEach((absensi) => {
      const { tanggal, jam_masuk, jam_keluar } = absensi;
      formattedData.push({
        id: index + 1,
        karyawan: `Karyawan ${karyawanId}`,
        tanggal,
        jam_masuk,
        jam_keluar
      });
    });
  });

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
          {formattedData.map((absensi, index) => (
            <tr key={absensi.id}>
              <td>{index + 1}</td>
              <td>{absensi.karyawan}</td>
              <td>{absensi.tanggal}</td>
              <td>{absensi.jam_masuk}</td>
              <td>{absensi.jam_keluar ? absensi.jam_keluar : "Belum absen keluar"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AbsenperTanggal;
