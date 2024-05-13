import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export const FormSet = () => {


    const [karyawan, setKaryawan] = useState([]);
    const getKaryawan = async ()=> {
     const response = await axios.get(`http://localhost:5000/karyawan`)
     setKaryawan(response.data.karyawan)
    }

    const [shift ,setShift] = useState([]);
    const getJam = async ()=> {
        const response = await axios.get(`http://localhost:5000/admin/jamKerja`)
    }


  return (
    <div>FormSet</div>
  )
}
