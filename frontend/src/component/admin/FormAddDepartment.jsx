import React ,{ useState }from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export const FormAddDepartment = () => {
const [kode_department, setKodeDepartment] = useState('');
const [nama_department, setNamaDepartment] = useState('');
const [message, setMessage] = useState('')
const navigate = useNavigate();

const createDepartment = async (e) => {
    e.preventDefault();
    try {
        await axios.post(`http://localhost:5000/department`,{
            kode_department: kode_department,
            nama_department: nama_department
        });
      setMessage('Department berhasil di buat')
        navigate('/department');
        
    } catch (error) {
        setMessage(error.response.data.message)
    }
}


  return (
    <div>
         <h2 className="subtitle">Tambah cabang baru</h2>
   
   <div className="card is-shadowless">
     <div className="card-content">
       <div className="content">
         <form onSubmit={createDepartment}>
           <p className='has-text-centered'>{message}</p>
           <p className="has-text-centered"></p>
           <div className="field">
             <label className="label">Nama Department</label>
             <div className="control">
               <input
                 type="text"
                 className="input"
                 value={nama_department}
                 onChange={(e) => setNamaDepartment(e.target.value)}
                 placeholder="Nama cabang"
               />
             </div>
           </div>
           <div className="field">
             <label className="label">Kode Department</label>
             <div className="control">
               <input
                 type="number"
                 className="input"
                 value={kode_department}
                 onChange={(e) => setKodeDepartment(e.target.value)}
                 placeholder="Kode Cabang"
               />
             </div>
           </div>
         
          

           <div className="field">
             <div className="control">
               <button type="submit" className="button is-success">
                 Save
               </button>
             </div>
           </div>
         </form>
       </div>
     </div>
   </div>
        </div>
  )
}
