import React,{useEffect} from 'react'
import { ProfileAdmin } from '../../component/admin/ProfileAdmin';
import Layout from '../LayoutAdmin'
import {  useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const ProfileAdminPages = () => {
  return (
   <Layout>

    <ProfileAdmin />
    </Layout>
  )
}
