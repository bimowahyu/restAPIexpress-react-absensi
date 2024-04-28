import React, { useEffect } from "react";
import Layout from './layout'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../fitur/AuthKaryawan";
import ProfileKaryawan from "../component/ProfileKaryawan";

export const Profile = () => {
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
    <Layout>
        <ProfileKaryawan />
        </Layout>
  )
}
