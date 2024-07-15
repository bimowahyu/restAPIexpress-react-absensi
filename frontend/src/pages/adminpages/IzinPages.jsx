import React ,{useEffect} from 'react'
import Layout from '../LayoutAdmin'
import { FormIzin } from '../../component/admin/FormIzin';
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const IzinPages = () => {
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
        <FormIzin />
        </Layout>
  )
}
