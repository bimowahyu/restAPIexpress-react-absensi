import React,{useEffect} from 'react'
import { FormEditDepartment } from '../../component/admin/FormEditDepartment';
import Layout from '../LayoutAdmin'
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const EditDepartmentPages = () => {
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
          navigate("/department");
        }
      }, [isError, navigate]);
  return (
   <Layout>
    <FormEditDepartment />
   </Layout>
  )
}
