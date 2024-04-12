import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/loginAdmin";
import LoginKaryawan from "./component/loginKaryawan";
import CreateAbsen from "./pages/createAbsen";


function App() {
  return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Login />} />
<Route path="/loginKaryawan" element={<LoginKaryawan />} />
<Route path="/createabsen" element={<CreateAbsen />} />
</Routes>
</BrowserRouter>
  );
}

export default App;
