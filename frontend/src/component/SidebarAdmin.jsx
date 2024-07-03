import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoStorefrontOutline, IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../fitur/AuthSlice";
//import axios from "axios";
// import "../app/Side.css"

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [dataAdmin, setDataAdmin] = useState(null);
  const [error, setError] = useState(null);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/loginadmin");
  };

  return (
    <div>
         <aside className="menu pl-2 has-shadow bg-grey">
    {/* <div className="sidebar" style={{ backgroundColor: "#505160", color: "white" ,position:"fixed"}}> */}
    <div className="sidebar" 
    style={{ 
    position: "fixed", top: 70, bottom: 50, left: 0, width: "200px", overflowY: "auto" }}>
      <ul className="menu-list">
        <li>
          <NavLink to="/DashboardAdmin"><IoHome />Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/datacabang"><IoPricetag />Data Cabang</NavLink>
        </li>
        <li>
          <NavLink to="/datacabang/tambah"><IoPricetag />Tambah Data Cabang</NavLink>
        </li>
        <li>
          <NavLink to="/department"><IoStorefrontOutline/>Data Department</NavLink>
        </li>
        <li>
          <NavLink to="/department/tambah"><IoStorefrontOutline/>Tambah Data Department</NavLink>
        </li>
        <li>
          <NavLink to="/datakaryawan"><IoPerson />Data Karyawan</NavLink>
        </li>
        <li>
          <NavLink to="/karyawan/tambah"><IoPerson />Tambah Data Karyawan</NavLink>
        </li>
        <li>
          <NavLink to="/set"><IoPerson />Atur jam karyawan</NavLink>
        </li>
        <li>
          <NavLink to="/jam"><IoPerson />Data Shift</NavLink>
        </li>
        <li>
          <NavLink to="/lihatizin"><IoPerson />Pengajuan izin</NavLink>
        </li>
      </ul>

      <p className="menu-label">Settings</p>
      <ul className="menu-list">
        <li>
          <NavLink to="/admin"><IoPerson />Profile</NavLink>
        </li>
        <li>
          <button onClick={logout} className="button is-white">
            <IoLogOut />Logout
          </button>
        </li>
      </ul>
    </div>
    </aside>
    </div>
  );
};

export default Sidebar;
