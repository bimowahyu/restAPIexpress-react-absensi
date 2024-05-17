import React, { useEffect } from "react";
import ClockOut from "../component/ClockOut";
// import Layout from './layout'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../fitur/AuthKaryawan";

export const ClockOutPages = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);
  
    useEffect(() => {
      dispatch(getMe());
    }, [dispatch]);
  
    useEffect(() => {
      if (isError) {
        navigate("/");
      }
    }, [isError, navigate]);
  
  return (
  
    <ClockOut />
  
  )
}
