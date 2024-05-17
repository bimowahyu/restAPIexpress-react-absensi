import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {IoStorefrontOutline, IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../fitur/AuthKaryawan";
import axios from "axios";
import "../app/Side.css"

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dataKaryawan, setDataKaryawan] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            // Panggil fungsi getMe untuk mendapatkan data karyawan yang sedang login
            const response = await axios.get('http://localhost:5000/MeKaryawan'); // Harap perhatikan bahwa getMe harus mengembalikan data karyawan yang sedang login
            setDataKaryawan(response.data); // Simpan data karyawan ke dalam state
        } catch (error) {
            setError(error.message); // Tangani kesalahan jika terjadi
        }
    };

    fetchProfile(); // Panggil fungsi fetchProfile saat komponen dimuat
}, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      {/* Tombol menu hamburger */}
      <div className="hamburger-menu" onClick={toggleSidebar} style={{ left: isSidebarOpen ? '200px' : '0px' }}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      {/* Sidebar */}
      <aside className={`menu pl-2 has-shadow bg-grey ${isSidebarOpen ? 'open' : ''}`}>
        <p className="menu-label"></p>
        <br></br>
        {dataKaryawan ? (
                
                    <div>
                       
                       <p>Hai..</p>{dataKaryawan.nama_lengkap}
                       
                    </div>
                   
                   
              
            ) : (
                <div>Loading...</div>
            )}
        <ul className="menu-list">
        <li>
            <NavLink to="/dashboard"><IoHome />Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/createAbsen"><IoHome />Create Absen</NavLink>
          </li>
          <li>
            <NavLink to="/GetAbsen"><IoPricetag />Absen Hari Ini</NavLink>
          </li>
          <li>
            <NavLink to="/Ijin"><IoStorefrontOutline/>Pengajuan Izin</NavLink>
          </li>
        </ul>
        <p className="menu-label">Settings</p>
        <ul className="menu-list">
        <li>
               
               <NavLink to="/users"><IoPerson />Profile</NavLink>  
                 
               </li>
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut />Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
