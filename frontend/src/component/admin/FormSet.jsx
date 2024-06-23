import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const FormSet = () => {
  const [karyawan, setKaryawan] = useState([]);
  const [jam, setJamKerja] = useState([]);
  const [selectedKaryawan, setSelectedKaryawan] = useState('');
  const [selectedJamKerja, setSelectedJamKerja] = useState('');
  const [hari, setHari] = useState('');

  useEffect(() => {
    getKaryawan();
    getJamKerja();
  }, []);

  const getKaryawan = async () => {
    try {
      const response = await axios.get('http://localhost:5000/karyawan');
      console.log('Karyawan Data:', response.data); // Log response
      setKaryawan(response.data.karyawan || []); // Ensure karyawan is an array
    } catch (error) {
      console.error('Error fetching karyawan:', error);
    }
  };

  const getJamKerja = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/jamKerja');
      console.log('Jam Kerja Data:', response.data); // Log response
      setJamKerja(response.data.jam || []); // Ensure jam is an array
    } catch (error) {
      console.error('Error fetching jam kerja:', error);
    }
  };

  const handleSetJam = async () => {
    try {
      const response = await axios.post('http://localhost:5000/set', {
        karyawan_id: selectedKaryawan,
        jam_id: selectedJamKerja,
        hari: hari
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error setting jam kerja:', error);
    }
  };

  return (
    <div>
      <h2 className="subtitle">Atur Jam Kerja</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <div className="field">
              <label className="label">Pilih Karyawan</label>
              <div className="control">
                <div className="select">
                  <select
                    value={selectedKaryawan}
                    onChange={(e) => setSelectedKaryawan(e.target.value)}
                  >
                    <option value="">Pilih Karyawan</option>
                    {karyawan && karyawan.map((karyawan) => (
                      <option key={karyawan.id} value={karyawan.id}>
                        {karyawan.nama_lengkap}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
             <label className="label">Hari</label>
             <div className="control">
               <input
                 type="text"
                 className="input"
                 value={hari}
                 onChange={(e) => setHari(e.target.value)}
                 placeholder="hari"
               />
             </div>
           </div>
            </div>

            <div className="field">
              <label className="label">Pilih Jam Kerja</label>
              <div className="control">
                <div className="select">
                  <select
                    value={selectedJamKerja}
                    onChange={(e) => setSelectedJamKerja(e.target.value)}
                  >
                    <option value="">Pilih Jam Kerja</option>
                    {jam && jam.map((jam) => (
                      <option key={jam.id} value={jam.id}>
                        {jam.set_jamMasuk}
                      </option>
                    ))}
                  </select>
                </div>
                
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button
                  onClick={handleSetJam}
                  className="button is-primary"
                  disabled={!selectedKaryawan || !selectedJamKerja}
                >
                  Set Jam Kerja
                </button>
              </div>
            </div>

            {/* <table className="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>No</th>
                  <th>NIK</th>
                  <th>Nama</th>
                  <th>Jabatan</th>
                  <th>Nomor</th>
                  <th>Department</th>
                  <th>Cabang</th>
                </tr>
              </thead>
              <tbody>
                {karyawan && karyawan.map((karyawan, index) => (
                  <tr key={karyawan.id}>
                    <td>{index + 1}</td>
                    <td>{karyawan.nik}</td>
                    <td>{karyawan.nama_lengkap}</td>
                    <td>{karyawan.jabatan}</td>
                    <td>{karyawan.no_telp}</td>
                    <td>{karyawan.Department ? karyawan.Department.nama_department : ''}</td>
                    <td>{karyawan.Cabang ? karyawan.Cabang.nama_cabang : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table> */}
          </div>
        </div>
      </div>
    </div>
  );
};
