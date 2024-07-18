import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import moment from 'moment-timezone'; 
import { Container, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import LokasiKeluar from './lokasikeluar';
import "../app/Side.css"
import { IoLocationOutline, IoCamera ,IoTimeOutline} from "react-icons/io5";
import { getMe } from '../fitur/AuthKaryawan';


// import Layout from '../pages/layout';

const ClockOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [radius, setRadius] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitudeKeluar, setLatitudeKeluar] = useState(null);
  const [longitudeKeluar, setLongitudeKeluar] = useState(null);
  const [existingAbsensi, setExistingAbsensi] = useState(null); 
  // const [absensiData, setAbsensiData] = useState(null);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cabang');
        const { radius } = response.data; 
        setRadius(radius);
      } catch (error) {
        console.error('Error fetching branch data:', error);
      }
    };

    fetchBranchData();
  }, []);

  const takePicture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      const photo = document.createElement('canvas');
      video.srcObject = stream;
      video.play();
      setTimeout(() => {
        photo.width = video.videoWidth;
        photo.height = video.videoHeight;
        const context = photo.getContext('2d');
        context.drawImage(video, 0, 0, photo.width, photo.height);
        const imageUrl = photo.toDataURL('image/png');
        setImageSrc(imageUrl);
        video.srcObject.getTracks().forEach(track => track.stop());
      }, 1000);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const getLocationKeluar = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitudeKeluar(position.coords.latitude); // Memperbarui latitude untuk absen keluar
         setLongitudeKeluar(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const fetchExistingAbsensi = async () => {
    try {
      const response = await axios.get('http://localhost:5000/absensi/get');
      setExistingAbsensi(response.data);
    } catch (error) {
      console.error('Error fetching existing absensi:', error);
    }
  };

//   const getTodayDateWithTimeZone = () => {
//     return moment().tz('Asia/Jakarta').format('YYYY-MM-DD');
//   };

//   const compareDatesWithSameTimeZone = (date1, date2) => {
//     return moment(date1).isSame(date2, 'day');
//   };

//   const createAbsensi = async () => {
//     try {
//       if (!latitude || !longitude || !imageSrc) {
//         return alert('Please capture image and get location before creating absensi.');
//       }
  
//       const todayDate = getTodayDateWithTimeZone();
  
//       if (!existingAbsensi) {
//         // Lakukan fetch untuk mendapatkan data absensi terbaru jika existingAbsensi belum diinisialisasi
//         await fetchExistingAbsensi();
//       }
  
//       if (existingAbsensi && compareDatesWithSameTimeZone(todayDate, existingAbsensi.tgl_absensi) && existingAbsensi.cek === 1) {
//         return alert('Anda sudah melakukan absen masuk hari ini. Tunggu hingga tanggal berikutnya untuk melakukan absen masuk.');
//       }
  
//       const response = await axios.post('http://localhost:5000/absensi/karyawan/create', {
//         latitude,
//         longitude,
//         image: imageSrc,
//       });
  
//       alert(response.data);
  
//       navigate('/CreateAbsen');
//     } catch (error) {
//       console.error('Error creating absensi:', error);
//       if (error.response) {
//         alert(error.response.data.msg);
//       } else if (error.request) {
//         console.error('Request failed:', error.request);
//         alert('Request failed. Please try again later.');
//       } else {
//         console.error('Error:', error.message);
//         alert('An error occurred. Please try again later.');
//       }
//     }
//   };
  // const absenKeluar = async () => {
  //   try {
  //     if (!latitudeKeluar || !longitudeKeluar || !imageSrc) {
  //       return alert('Please capture image and get location before creating absensi.');
  //     }
  
  //     //const todayDate = getTodayDateWithTimeZone();
  
  //     // if (existingAbsensi && compareDatesWithSameTimeZone(todayDate, existingAbsensi.tgl_absensi) && existingAbsensi.cek === 1) {
  //     //   return alert('Anda sudah melakukan absen keluar hari ini. Tunggu hingga tanggal berikutnya untuk melakukan absen keluar.');
  //     // }

  //       const response = await axios.put('http://localhost:5000/absensi/karyawan/keluar',{
  //         latitude,
  //         longitude,
  //         image: imageSrc
  //       });
  //       alert(response.data);
  //       navigate('/createAbsen')
  //   } catch (error) {
  //     console.error('Error during absen keluar:', error);
  //     alert('Gagal absen keluar.');
  //   }
  // }
  // const absenKeluar = async () => {
  //   try {
  //     if (!latitudeKeluar || !longitudeKeluar || !imageSrc) {
  //       return alert('Please capture image and get location before creating absensi.');
  //     }
  
  //     const response = await axios.put('http://localhost:5000/absensi/karyawan/keluar', {
  //       latitude: latitudeKeluar,
  //       longitude: longitudeKeluar,
  //       image: imageSrc
  //     });
  
  //     alert(response.data); // Tampilkan pesan berhasil atau pesan lain dari server
  
  //     navigate('/createAbsen');
  //   } catch (error) {
  //     console.error('Error during absen keluar:', error);
  //     if (error.response) {
  //       // Tangkap pesan kesalahan dari respons axios
  //       alert(error.response.data.msg); // Tampilkan pesan kesalahan kepada pengguna
  //     } else if (error.request) {
  //       // Tangkap error jika request gagal tanpa mendapatkan respons dari server
  //       console.error('Request failed:', error.request);
  //       alert('Request failed. Please try again later.');
  //     } else {
  //       // Tangkap error lainnya
  //       console.error('Error:', error.message);
  //       alert('An error occurred. Please try again later.');
  //     }
  //   }
  // };
  const absenKeluar = async () => {
    try {
      if (!latitudeKeluar || !longitudeKeluar || !imageSrc) {
        return alert('Please capture image and get location before creating absensi.');
      }
  
      const response = await axios.put('http://localhost:5000/absensi/karyawan/keluar', {
        latitude: latitudeKeluar,
        longitude: longitudeKeluar,
        image: imageSrc
      });
  
      alert(response.data); // Tampilkan pesan dari server response
  
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating absensi:', error);
      if (error.response) {
        
        alert(error.response.data); 
      } else if (error.request) {
        console.error('Request failed:', error.request);
        alert('Request failed. Please try again later.');
      } else {
        console.error('Error:', error.message);
        alert('An error occurred. Please try again later.');
      }
    }
  };
  useEffect(() => {
    fetchExistingAbsensi();
  }, []);
  // useEffect(() => {
  //   const fetchAbsensiData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/absensi/get'); // Ganti URL sesuai dengan endpoint Anda
  //       setAbsensiData(response.data);
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   };

  //   fetchAbsensiData();
  // }, []);

  

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
    <Card>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            {imageSrc && (
              <div className="image-container">
                <img src={imageSrc} className="foto" alt="Captured" style={{ width: '100%', borderRadius: '8px' }} />
              </div>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <LokasiKeluar latitude={latitudeKeluar} longitude={longitudeKeluar} />
          </Grid>
        </Grid>
        <Typography variant="h5" style={{ marginTop: '20px', textAlign: 'center' }}>Absen Keluar</Typography>
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <Button onClick={takePicture} variant="outlined" fullWidth startIcon={<IoCamera />}>Take Picture</Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={getLocationKeluar} variant="outlined" fullWidth startIcon={<IoLocationOutline />}>Get Location</Button>
          </Grid>
          {latitudeKeluar !== null && longitudeKeluar !== null && (
            <Grid item xs={12}>
              <Typography variant="body2">Latitude: {latitudeKeluar}</Typography>
              <Typography variant="body2">Longitude: {longitudeKeluar}</Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button onClick={absenKeluar} variant="contained" color="primary" fullWidth startIcon={<IoTimeOutline />}>Clock Out</Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Container>
  );
};

export default ClockOut;
