import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export const DataDepartment = () => {

    useEffect(() => {
        getDepartment();
    }, []);


    const[department, setDepartment] = useState([]);

    const getDepartment = async () => {
        const response = await axios.get("http://localhost:5000/department");
        setDepartment(response.data);
    }

    const deleteDepartment = async (id) => {   
        try {
            const userConfrim = window.confirm('Apakah anda ingin menghapus data?')
            if (userConfrim) {
                await axios.delete(`http://localhost:5000/department/${id}`);
                console.log('Data berhasil di hapus')
                getDepartment();
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
          <th>Nama Department</th>
          <th>Kode Department</th>
        
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {department.map((department, index) => (
          <tr key={department.id}>
            <td>{index + 1}</td>
            <td>{department.nama_department}</td>
            <td>{department.kode_department}</td>
           
            <td>
              <Link to={`/datadepartment/edit/${department.id}`} className="button is-small is-info">
                Edit
              </Link>
              <button onClick={() => deleteDepartment(department.id)} className="button is-small is-danger">
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
