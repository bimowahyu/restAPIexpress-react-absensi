import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
// import Izin from '../../../../backend/models/Izin';

export const FormIzin = () => {
    useEffect(() => {
        getIzin();
    }, []);

    const [izin, setIzin] = useState([])

    const getIzin = async () => {
        const response = await axios.get(`http://localhost:5000/izin`)
        setIzin(response.data)
    }

  return (
    <div>
    <table className="table is-striped is-fullwidth">
  <thead>
    <tr>
      <th>No</th>
      <th>Tanggal Izin</th>
      <th>Status</th>
      <th>Keterangan</th>
      <th>Status</th>
      <th>Foto</th>
      <th>Nama Karyawan</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {izin.map((izin, index) => (
      <tr key={izin.id}>
        <td>{index + 1}</td>
        <td>{izin.tgl_izin}</td>
        <td>{izin.status}</td>
        <td>{izin.keterangan}</td>
        <td>{izin.status_approved}</td>
        <td>{izin.foto}</td>
        <td>{izin.KaryawanId}</td>
       
        <td>
          <Link to={`/izin/edit/${izin.id}`} className="button is-small is-info">
            Edit
          </Link>
          {/* <button onClick={() => deleteDepartment(department.id)} className="button is-small is-danger">
            Delete
          </button> */}
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>
  )
}
