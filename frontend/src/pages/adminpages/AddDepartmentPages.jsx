import React ,{useEffect} from 'react'
import Layout from '../LayoutAdmin'
import { FormAddDepartment } from '../../component/admin/FormAddDepartment';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const AddDepartmentPages = () => {
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
    <FormAddDepartment />
   </Layout>
  )
}
