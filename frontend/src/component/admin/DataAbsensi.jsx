import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AbsensiChart = () => {
  const [absensiData, setAbsensiData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mendapatkan bulan dan tahun saat ini
        const now = new Date();
        const bulan = now.getMonth() + 1; // Perhatikan bahwa bulan dimulai dari 0, jadi perlu ditambah 1
        const tahun = now.getFullYear();

        // Mengirimkan permintaan ke backend dengan bulan dan tahun saat ini
        const response = await axios.get(`http://localhost:5000/absensitotal/get?bulan=${bulan}&tahun=${tahun}`);
        const data = response.data;

        // Mengonversi data absensi menjadi format yang diperlukan oleh Recharts
        const chartData = Object.keys(data).map(karyawanId => ({
          name: `Karyawan ${karyawanId}`,
          kehadiran: data[karyawanId]
        }));

        setAbsensiData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
   
      <div style={{ height: '400px', width: '600px' }}>
        <LineChart
          width={600}
          height={400}
          data={absensiData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="kehadiran" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    </div>
  );
};

export default AbsensiChart;
