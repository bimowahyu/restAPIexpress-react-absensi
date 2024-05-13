import React,{useEffect} from 'react'
import { FormEditCabang } from '../../component/admin/FormEditCabang'
import Layout from '../LayoutAdmin'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const EditCabangPages = () => {
    const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(getMe());
  // }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/datacabang");
    }
  }, [isError, navigate]);
  return (
    <Layout>
        <FormEditCabang />
    </Layout>
  )
}
