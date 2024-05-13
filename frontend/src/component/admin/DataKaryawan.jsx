import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export const DataKaryawan = () => {

    const [karyawan, setKaryawan] = useState([]);
   const getKaryawan = async ()=> {
    const response = await axios.get(`http://localhost:5000/karyawan`)
    setKaryawan(response.data.karyawan)
   }

   useEffect(() => {
    getKaryawan();
   }, [])

   const deleteKaraywan = async (id) => {   
    try {
        const userConfrim = window.confirm('Apakah anda ingin menghapus data?')
        if (userConfrim) {
            await axios.delete(`http://localhost:5000/karyawan/${id}`);
            console.log('Data berhasil di hapus')
            getKaryawan();
        }
        
    } catch (error) {
        console.error('Data gagal di hapus');
    } 
}
  return (
    <div>
    <table className="table is-striped is-fullwidth">
  <thead>
    <tr>
      <th>No</th>
      <th>NIK</th>
      <th>Nama</th>
      <th>Jabatan</th>
      <th>Nomor</th>
      <th>Department</th>
      <th>Cabang</th>
    
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {karyawan.map((karyawan, index) => (
      <tr key={karyawan.id}>
        <td>{index + 1}</td>
        <td>{karyawan.nik}</td>
        <td>{karyawan.nama_lengkap}</td>
        <td>{karyawan.jabatan}</td>
        <td>{karyawan.no_telp}</td>
        <td>{karyawan.Department ? karyawan.Department.nama_department : ''}</td> {/* Display department name */}
        <td>{karyawan.Cabang ? karyawan.Cabang.nama_cabang : ''}</td> {/* Display branch name */}      
        <td>
          <Link to={`/datakaryawan/edit/${karyawan.id}`} className="button is-small is-info">
            Edit
          </Link>
          <button onClick={() => deleteKaraywan(karyawan.id)} className="button is-small is-danger">
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>
  )
}
