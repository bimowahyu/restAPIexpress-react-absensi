import React ,{useEffect} from 'react'
import Layout from '../LayoutAdmin'
import { DataDepartment } from '../../component/admin/DataDepartment';
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const DepartmentPages = () => {
    //const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);
  
    // useEffect(() => {
    //   dispatch(getMe());
    // }, [dispatch]);
  
    useEffect(() => {
      if (isError) {
        navigate("/");
      }
    }, [isError, navigate]);
  
  return (
    <Layout>
        <DataDepartment />
        </Layout>
  )
}
