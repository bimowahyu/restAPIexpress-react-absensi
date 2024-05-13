import React ,{useState, useEffect}from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export const FormEditCabang = () => {
    const [kodeCabang, setKodeCabang ] = useState('');
const [namaCabang, setNamaCabang] = useState('')
const [latitude, setLatitude ] = useState('');
const [longitude, setLongitude] = useState('');
const [radius, setRadius] = useState('');
const [message, setMessage] = useState('')
const navigate = useNavigate();
const {id} = useParams();

useEffect(() => {
  const getCabangById = async () =>{
    try {
        const response = await axios.get(`http://localhost:5000/cabang/${id}`);
        setKodeCabang(response.data.kode_cabang);
        setNamaCabang(response.data.nama_cabang);
        const locationArray = response.data.lokasi_kantor.split(',');
        setLatitude(locationArray[0]);
        setLongitude(locationArray[1]);
        setRadius(response.data.radius);
    } catch (error) {
        if(error.response){
            setMessage(error.response.data.message)
        }
    }
};
    getCabangById();

},[id]);

const updateCabang = async (e)=> {
    e.preventDefault();
    try {
        const response = await axios.put(`http://localhost:5000/cabang/${id}`,{
            nama_cabang:namaCabang,
            kode_cabang:kodeCabang,
            lokasi_kantor:`${latitude},${longitude}`,
            radius:radius
        });
        console.log(response.data)
        navigate('/datacabang');
    } catch (error) {
        if(error.response){
          setMessage(error.response.data.message);
        }
    }
    
}


  return (
    <div>
         {/* <h1 className="title">Products</h1> */}
    <h2 className="subtitle">Edit cabang</h2>
    <div className="card is-shadowless">
      <div className="card-content">
        <div className="content">
          <form onSubmit = {updateCabang}>

            <p className="has-text-centered">{message}</p>
            <div className="field">
              <label className="label">Nama cabang</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={namaCabang}
                  onChange={(e) => setNamaCabang(e.target.value)}
                  placeholder="Silahkan ganti nama cabang"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Kode Cabang</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={kodeCabang}
                  onChange={(e) => setKodeCabang(e.target.value)}
                  placeholder="Edit kode cabang"
                />
              </div>
            </div>
            <div className="field">
                <label className="label">Lokasi</label>
                <div className="control" style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                    type="text"
                    className="input"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="Latitude"
                    style={{ marginRight: '5px' }} // Memberi jarak antara input latitude dan longitude
                    />
                    <input
                    type="text"
                    className="input"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="Longitude"
                    />
                </div>
</div>
            <div className="field">
              <label className="label">Radius Absensi</label>
              <div className="control">
                <input
                  type="number"
                  className="input"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  placeholder="Edit Radius absensi"
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-success">
                  Update
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
