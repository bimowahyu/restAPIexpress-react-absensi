import React,{useState, useEffect} from 'react'
import axios from 'axios'


  


export const Datacabang = () => {
    const [cabang, setCabang] = useState([]);

    useEffect(() => {
        getCabang();
    },[]);

    const getCabang = async ()=>{
        try {
            const response = await axios.get('http://localhost:5000/cabang');
            setCabang(response.data);
        } catch (error) {
            console.error('Error fetching cabang:', error)
        }
    }
    const deleteCabang = async (Id) => {
        const userConfrim = window.confirm('Apakah anda ingin menghapus cabang?')

        if(userConfrim){
            try {
                await axios.delete(`http://localhost:5000/cabang/${Id}`);
                console.log('Cabang berhasil di hapus')
                getCabang();
            } catch (error) {
                console.error('Cabang gagal di hapus')
            }
        }
    }
  return (
    <div>
    {/* <h1 className="title">Data Cabang</h1> */}
 
    {/* <Link to="/products/add" className="button is-primary mb-2">
      Add New
    </Link> */}
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Cabang</th>
          <th>Kode Cabang</th>
          <th>Lokasi Kantor</th>
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
            <td>
              {/* <Link to={`/products/edit/${product.uuid}`} className="button is-small is-info">
                Edit
              </Link> */}
              <button onClick={() => deleteCabang(cabang.id)} className="button is-small is-danger">
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
