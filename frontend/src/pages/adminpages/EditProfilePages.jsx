import React,{useEffect} from 'react'
import { FormEditProfile } from '../../component/admin/FormEditProfile';
import Layout from '../LayoutAdmin'
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const EditProfilePages = () => {

    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
          navigate("/admin");
        }
      }, [isError, navigate]);


  return (
   <Layout>
<FormEditProfile />
    </Layout>
  )
}
