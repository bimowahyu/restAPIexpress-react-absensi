import React,{useEffect} from 'react'
import { FormSet } from '../../component/admin/FormSet';
import Layout from '../LayoutAdmin'
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const SetPages = () => {
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
          navigate("/department");
        }
      }, [isError, navigate]);
  return (
   <Layout>
    <FormSet />
   </Layout>
  )
}
