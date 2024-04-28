import React,{useState, useEffect} from 'react';
import { NavLink,useNavigate } from "react-router-dom";
//import logo from "../login.jpeg";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import { LogOut, reset } from '../fitur/AuthSlice';
import axios from 'axios';

const NavBar = () => {
  const [dataAdmin, setDataAdmin] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Me');
        setDataAdmin(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProfile();
  }, []);

  const logout = () =>{
    dispatch(LogOut());
    dispatch(reset());
    navigate("/loginadmin");
  }

  return (
    <div>
        <nav className="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <NavLink to="/"className="navbar-item" href="https://bulma.io">
              {/* <img src={logo}
               width="112" height="28"
               alt="logo"
               /> */}
            </NavLink>
        
            {/* <a href='!#' role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a> */}
              {dataAdmin ? (
        <div>
          <p>Login sebagai Admin:</p>{dataAdmin.name}
        </div>
      ) : (
        <div>Loading...</div>
      )}
          </div>
       
          
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <button onClick={logout} className="button is-light">
                    Log out
                  </button>
                </div>
                </div>
              </div>
              </nav>
            </div>
         
    
  )
}

export default NavBar