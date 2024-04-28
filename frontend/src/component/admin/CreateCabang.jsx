import React ,{ useState }from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export const CreateCabang = () => {
const [kodeCabang, setKodeCabang ] = useState('');
const [namaCabang, setNamaCabang] = useState('')
const [latitude, setLatitude ] = useState('');
const [longitude, setLongitude] = useState('');
const [radius, setRadius] = useState('');
const [message, setMessage] = useState('')
const navigate = useNavigate();

const saveCabang = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`http://localhost:5000/cabang`, {
      kode_cabang: kodeCabang,
        nama_cabang: namaCabang,
        latitude: latitude,
        longitude: longitude,
        radius: radius
    });
    setMessage('cabang berhasil di tambahkan');
    navigate('/datacabang');
  } catch (error) {
    setMessage(error.response.data.msg);
  }
};


  return (
    <div>
    {/* <h1 className="title">Products</h1> */}
    <h2 className="subtitle">Tambah cabang baru</h2>
   
    <div className="card is-shadowless">
      <div className="card-content">
        <div className="content">
          <form onSubmit={saveCabang}>
            <p className='has-text-centered'>{message}</p>
            <p className="has-text-centered"></p>
            <div className="field">
              <label className="label">Nama Cabang</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={namaCabang}
                  onChange={(e) => setNamaCabang(e.target.value)}
                  placeholder="Nama cabang"
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
                  placeholder="Kode Cabang"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Latitude Maps</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Masukan Latitude"
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Longitude Maps</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="Masukan Longitude"
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
                  placeholder="Masukan Radius Absensi (Meter)"
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
