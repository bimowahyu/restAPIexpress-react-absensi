import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


export const UpdateIzin = () => {
    const[status_approved, setStatus] = useState('')
    const[tgl_izin, setTanggalIzin] = useState('')
    const[izin, setIzin] = useState('')
    const[keterangan, setKeterangan] = useState('')
    const[KaryawanId, setKaryawanId] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()

    const getIzinById = async()=>{
        try {
            const response = await axios.get(`http://localhost:5000/izin/${id}`)
            setStatus(response.data.status_approved)
            setTanggalIzin(response.data.tgl_izin)
            setIzin(response.data.izin)
            setKeterangan(response.data.keterangan)
            setKaryawanId(response.data.KaryawanId)
        } catch (error) {
            if(error.response){
                setMessage(error.response.data.message)
            }
            
        }
    }

    const editIzin = async (e)=> {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/izin/${id}`,{
                status_approved: status_approved
            })
            console.log(response.data)
        } catch (error) {
            if(error.message)
             setMessage(error.response.data.message)
            
        }
    }

  return (
    <div>
            <h2 className="subtitle">Update Izin</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={editIzin}>
                            <p className="has-text-centered">{message}</p>
                            <div className="field">
                                <label className="label">Status di setujui</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={status_approved}
                                        onChange={(e) => setStatus(e.target.value)}
                                        placeholder=""
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
