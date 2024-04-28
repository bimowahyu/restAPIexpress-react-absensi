import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoStorefrontOutline, IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../fitur/AuthSlice";
import axios from "axios";

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
    <div className="sidebar" style={{ backgroundColor: "#505160", color: "white" ,position:"fixed"}}>
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
          <NavLink to="/karyawan"><IoPerson />Data Karyawan</NavLink>
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
          <NavLink to="/users"><IoPerson />Profile</NavLink>
        </li>
        <li>
          <button onClick={logout} className="button is-white">
            <IoLogOut />Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
