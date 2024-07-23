import React from 'react';
import axios from 'axios';
import useSWR from 'swr';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const fetcher = (url) => axios.get(url).then(res => res.data);

const AbsensiChart = () => {
  const now = new Date();
  const bulan = now.getMonth() + 1;
  const tahun = now.getFullYear();

  const { data, error } = useSWR(`http://localhost:5000/absensitotal/get?bulan=${bulan}&tahun=${tahun}`, fetcher);

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

 
  const chartData = Object.keys(data).map(karyawanId => ({
    name: `Karyawan ${karyawanId}`,
    kehadiran: data[karyawanId]
  }));

  return (
    <div>
      <h2>Absensi Harian</h2>
      <div style={{ height: '400px', width: '600px' }}>
        <LineChart
          width={600}
          height={400}
          data={chartData}
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
