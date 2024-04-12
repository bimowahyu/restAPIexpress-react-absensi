import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import moment from 'moment-timezone'; // Import moment-timezone for handling time zones
import LocationDisplay from '../component/location';

const CreateAbsen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [imageSrc, setImageSrc] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [existingAbsensi, setExistingAbsensi] = useState(null); // State to store existing absensi data

  // Function to capture image from camera
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
      }, 1000); // Adjust the delay as needed
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  // Function to get current location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      error => {
        console.error('Error getting location:', error);
        alert('Failed to get location. Please try again.');
      }
    );
  };

  // Function to fetch existing absensi data from backend
  const fetchExistingAbsensi = async () => {
    try {
      const response = await axios.get('http://localhost:5000/absensi/get');
      setExistingAbsensi(response.data);
    } catch (error) {
      console.error('Error fetching existing absensi:', error);
    }
  };

  // Function to get today's date with the appropriate time zone
  const getTodayDateWithTimeZone = () => {
    return moment().tz('Asia/Jakarta').format('YYYY-MM-DD');
  };

  // Function to compare two dates with the same time zone
  const compareDatesWithSameTimeZone = (date1, date2) => {
    return moment(date1).isSame(date2, 'day');
  };

  // Function to create absensi
  const createAbsensi = async () => {
    try {
      // Make sure latitude, longitude, and imageSrc are not null
      if (!latitude || !longitude || !imageSrc) {
        // Handle error when required data is missing
        return alert('Please capture image and get location before creating absensi.');
      }
  
      // Get today's date with appropriate time zone
      const todayDate = getTodayDateWithTimeZone();
  
      // Compare today's date with the date of existing absensi if available
      // If they are the same, alert user and do not proceed with creating absensi
      // Otherwise, continue with creating absensi
      if (existingAbsensi && compareDatesWithSameTimeZone(todayDate, existingAbsensi.tgl_absensi) && existingAbsensi.cek === 1) {
        return alert('Anda sudah melakukan absen masuk hari ini. Tunggu hingga tanggal berikutnya untuk melakukan absen masuk.');
      }
  
      // Send data to backend
      const response = await axios.post('http://localhost:5000/absensi/karyawan/create', {
        latitude,
        longitude,
        image: imageSrc,
      });
  
      // Handle success response from backend
      alert(response.data);
      
      // Navigate to desired page
      navigate('/CreateAbsen');
    } catch (error) {
      // Handle error response from backend
      console.error('Error creating absensi:', error);
      alert('Error creating absensi. Please try again later.');
    }
  };

  // Fetch existing absensi data when component mounts
  useEffect(() => {
    fetchExistingAbsensi();
  }, []);

  return (
    <div>
      <h1>Create Absen</h1>
      <LocationDisplay latitude={latitude} longitude={longitude} />
      <button onClick={takePicture}>Take Picture</button>
      {imageSrc && <img src={imageSrc} alt="Captured" />}
      <button onClick={getLocation}>Get Location</button>
      {latitude !== null && longitude !== null && (
        <p>Latitude: {latitude}, Longitude: {longitude}</p>
      )}
      <button onClick={createAbsensi}>Create Absensi</button>
    </div>
  );
};

export default CreateAbsen;
