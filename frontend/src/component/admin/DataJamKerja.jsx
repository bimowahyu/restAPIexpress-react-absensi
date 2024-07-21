import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


export const DataJamKerja = () => {

const[Data, setData] = useState([]);

useEffect(() => {
    getJam();
},[]);


const getJam = async ()=> {
    try {
        const response = await axios.get(`http://localhost:5000/get/jam`)
    setData(response.data)
    } catch (error) {
        console.error('Error fetching Shift:', error)
    }

}


  return (
    <div>
    <table className="table is-striped is-fullwidth">
  <thead>
    <tr>
      <th>No</th>
      <th>Nama Karyawan</th>
      <th>Jam Kerja</th>
      <th>Hari</th>
    
      {/* <th>Actions</th> */}
    </tr>
  </thead>
  <tbody>
    {Data.map((jamById, index) => (
      <tr key={jamById.id}>
        <td>{index + 1}</td>
              <td>{jamById.karyawan ? jamById.karyawan.nama_lengkap : ''}</td>
              <td>{jamById.jamDetail ? jamById.jamDetail.nama_jamkerja : ''}</td>
              <td>{jamById.hari}</td>
       
        {/* <td>
          <Link to={`/datadepartment/edit/${department.id}`} className="button is-small is-info">
            Edit
          </Link>
          <button onClick={() => deleteDepartment(department.id)} className="button is-small is-danger">
            Delete
          </button>
        </td> */}
      </tr>
    ))}
  </tbody>
</table>
</div>
  )
}
