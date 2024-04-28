import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/loginAdmin";
import LoginKaryawan from "./component/loginKaryawan";
import { CreateAbsenPages } from "./pages/CreateAbsenPages";
import { GetAbsen } from "./pages/GetAbsen";
import { Profile } from "./pages/Profile";
import { CabangPages } from "./pages/adminpages/CabangPages";
// import { DashboardAdminPages } from "./pages/adminpages/DashboardAdminPages";
import Dashboard from "./pages/adminpages/DashboardAdminPages";
import { TambahCabangPages } from "./pages/adminpages/CrateCabangPages";


function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<LoginKaryawan />} />
        <Route path="/loginadmin" element={<Login />} />
        <Route path="/datacabang" element={<CabangPages />} />
        <Route path="datacabang/tambah" element={<TambahCabangPages />} />
        <Route path="/DashboardAdmin" element={<Dashboard />} />
        <Route path="/createabsen" element={<CreateAbsenPages />} />
        <Route path="/GetAbsen" element={<GetAbsen />} />
        <Route path="/users" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
