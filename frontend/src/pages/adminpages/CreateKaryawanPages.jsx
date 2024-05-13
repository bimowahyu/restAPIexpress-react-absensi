import React ,{useEffect} from 'react'
import Layout from '../LayoutAdmin'
import { CreateKaryawan } from '../../component/admin/FromAddKaryawan';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CreateKaryawanPages = () => {
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
        <CreateKaryawan />
        </Layout>
  )
}
