import React,{useState, useEffect} from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line } from 'recharts';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AbsensiChart from './DataAbsensi';
import AbsensiDetail from './AbsensiDetail';
import { JumlahKaryawan } from './JumlahKaryawan';



const DashboardAdmin = () => {
  const [karyawanData, setKaryawanData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/karyawan');
        const { karyawan, department } = response.data;
  
        // Buat objek untuk menyimpan data departemen
        const departmentMap = {};
        department.forEach(dep => {
          departmentMap[dep.id] = dep.nama_department;
        });
  
        // Perbarui data karyawan dengan nama departemen
        const karyawanWithDepartmentName = karyawan.map(kar => ({
          ...kar,
          departmentName: departmentMap[kar.DepartmentId]
        }));
  
        setKaryawanData(karyawanWithDepartmentName);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  

  const departmentCount = karyawanData.reduce((acc, karyawan) => {
    const departmentName = karyawan.Department ? karyawan.Department.nama_department : "";
  
    acc[departmentName] = (acc[departmentName] || 0) + 1;
    return acc;
  }, {});

  const dataForChart = Object.keys(departmentCount).map(departmentName => ({
    department: departmentName,
    jumlahKaryawan: departmentCount[departmentName],
  }));



  return (
    <div>
      <div className="chart">
    <div style={{ position: "relative" }}>
    <h1>Jumlah Karyawan</h1>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <h2>Grafik Jumlah Karyawan</h2>
        <ResponsiveContainer width="90%" height={300}>
          <BarChart
            data={dataForChart}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="jumlahKaryawan" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div>
        <h2>Data Absensi Bulan Ini</h2>
        <AbsensiChart />
      </div>
     </div>
    </div>
    <div>
        <h2>Data Absensi Bulan Ini</h2>
        <AbsensiDetail />
      </div>
  </div>
  </div>
);
};

export default DashboardAdmin;