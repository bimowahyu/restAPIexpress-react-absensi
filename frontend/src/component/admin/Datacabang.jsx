import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then(res => res.data);

export const Datacabang = () => {
  const { data: cabang, error, mutate } = useSWR('http://localhost:5000/cabang', fetcher);

  if (error) return <div>Error loading data</div>;
  if (!cabang) return <div>Loading...</div>;

  const deleteCabang = async (id) => {
    const userConfirm = window.confirm('Apakah anda ingin menghapus cabang?');

    if (userConfirm) {
      try {
        await axios.delete(`http://localhost:5000/cabang/${id}`);
        console.log('Cabang berhasil dihapus');
        mutate(); 
      } catch (error) {
        console.error('Cabang gagal dihapus:', error);
      }
    }
  };

  return (
    <div>
     
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Cabang</th>
            <th>Kode Cabang</th>
            <th>Lokasi Kantor</th>
            <th>Radius Absensi</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cabang.map((cabang, index) => (
            <tr key={cabang.id}>
              <td>{index + 1}</td>
              <td>{cabang.nama_cabang}</td>
              <td>{cabang.kode_cabang}</td>
              <td>{cabang.lokasi_kantor}</td>
              <td>{cabang.radius} Meter</td>
              <td>
                <Link to={`/datacabang/edit/${cabang.id}`} className="button is-small is-info">
                  Edit
                </Link>
                <button onClick={() => deleteCabang(cabang.id)} className="button is-small is-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


