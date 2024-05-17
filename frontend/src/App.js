import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/loginAdmin";
import LoginKaryawan from "./component/loginKaryawan";
import { DashboardKaryawanPages } from "./pages/DashboardPages";
import { CreateAbsenPages } from "./pages/CreateAbsenPages";
import { ClockOutPages } from "./pages/ClockoutPages";
import { GetAbsen } from "./pages/GetAbsen";
import { Profile } from "./pages/Profile";
import { CabangPages } from "./pages/adminpages/CabangPages";
import Dashboard from "./pages/adminpages/DashboardAdminPages";
import { TambahCabangPages } from "./pages/adminpages/CrateCabangPages";
import { EditCabangPages } from "./pages/adminpages/EditCabangPages";
import { DepartmentPages } from "./pages/adminpages/DepartmentPages";
import { AddDepartmentPages } from "./pages/adminpages/AddDepartmentPages";
import { EditDepartmentPages } from "./pages/adminpages/EditDepartmentPages";
import { DataKaryawanPages } from "./pages/adminpages/DataKaryawanPages";
import { CreateKaryawanPages } from "./pages/adminpages/CreateKaryawanPages";



function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<LoginKaryawan />} />
        <Route path="/loginadmin" element={<Login />} />
        <Route path="/datacabang" element={<CabangPages />} />
        <Route path="/dashboard" element={<DashboardKaryawanPages />} />
        <Route path="/clockout" element={<ClockOutPages />} />
        <Route path="/department" element={<DepartmentPages />} />
        <Route path="/department/tambah" element={<AddDepartmentPages />} />
        <Route path="/datadepartment/edit/:id" element={<EditDepartmentPages />} />
        <Route path="/datacabang/tambah" element={<TambahCabangPages />} />
        <Route path="/datacabang/edit/:id" element={<EditCabangPages />} />
        <Route path="/datakaryawan" element={<DataKaryawanPages />} />
        <Route path="/karyawan/tambah" element={<CreateKaryawanPages />} />
        <Route path="/DashboardAdmin" element={<Dashboard />} />
        <Route path="/dashboard" element={<DashboardKaryawanPages />}/>
        <Route path="/createabsen" element={<CreateAbsenPages />} />
        <Route path="/GetAbsen" element={<GetAbsen />} />
        <Route path="/users" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
