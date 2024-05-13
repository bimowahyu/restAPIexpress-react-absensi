import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CreateKaryawan = () => {
  const [nik, setNik] = useState('');
  const [namaLengkap, setNamaLengkap] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [cabangId, setCabangId] = useState('');
  const [noTelp, setNoTelp] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [file, setFile] = useState("");
  const [departments, setDepartments] = useState([]);
  const [cabangs, setCabangs] = useState([]);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/department');
        setDepartments(response.data);

        const responseCabang = await axios.get('http://localhost:5000/cabang');
        setCabangs(responseCabang.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const saveKaryawan = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nik', nik);
      formData.append('nama_lengkap', namaLengkap);
      formData.append('jabatan', jabatan);
      formData.append('DepartmentId', departmentId); // Corrected key name
      formData.append('CabangId', cabangId); // Corrected key name
      formData.append('no_telp', noTelp);
      formData.append('password', password);
      formData.append('avatar', avatar);
     
      formData.append("file", file);

      const response = await axios.post('http://localhost:5000/karyawan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      setMessage('Karyawan berhasil dibuat');
      navigate('/datakaryawan');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };
  return (
    <div>
      <h2 className="subtitle">Tambah Karyawan Baru</h2>

      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveKaryawan}>
              <p className='has-text-centered'>{message}</p>
              <div className="field">
                <label className="label">NIK</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={nik}
                    onChange={(e) => setNik(e.target.value)}
                    placeholder="NIK"
                  />
                </div>
              </div>
              <div className="field">
        <label className="label">Nama Karyawan</label>
        <div className="control">
          <input
            type="text"
            className="input"
            value={namaLengkap}
            onChange={(e) => setNamaLengkap(e.target.value)}
            placeholder="Kode Cabang"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Jabatan</label>
        <div className="control">
          <input
            type="text"
            className="input"
            value={jabatan}
            onChange={(e) => setJabatan(e.target.value)}
            placeholder="Kode Cabang"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Nama Department</label>
        <div className="control">
        <label htmlFor="department">Department:</label>
          <select id="department" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
            <option value="">Select Department</option>
            {departments && departments.map((department) => (
                <option key={department.id} value={department.id}>{department.nama_department}</option>
            ))}
            </select>
        </div>
      </div>
      <div className="field">
        <label className="label">Nama Cabang</label>
        <div className="control">
        <label htmlFor="department">Cabang:</label>
          <select id="department" value={cabangId} onChange={(e) => setCabangId(e.target.value)}>
            <option value="">Pilih Cabang</option>
            {cabangs && cabangs.map((cabang) => (
                <option key={cabang.id} value={cabang.id}>{cabang.nama_cabang}</option>
            ))}
            </select>
        </div>
      </div>
      <div className="field">
        <label className="label">Nomor Telepon</label>
        <div className="control">
          <input
            type="number"
            className="input"
            value={noTelp}
            onChange={(e) => setNoTelp(e.target.value)}
            placeholder="No Telpon"
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>
      </div>
              {/* Other form fields */}
              <div className="field">
                <label className="label">Profile</label>
                <div className="control">
                  <input type="file" id="file" accept="image/*" onChange={loadImage} />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <div>
              {preview ? (
            <figure className="image is-128x128">
              <img src={preview} alt="Preview Image" />
            </figure>
          ) : (
            ""
          )}
          </div>
           </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
