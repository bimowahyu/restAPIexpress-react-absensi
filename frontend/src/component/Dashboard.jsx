import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, Grid, Avatar, Button } from '@mui/material';
import {IoStorefrontOutline, IoPerson, IoPricetag, IoHome, IoLogOut } from "react-icons/io5";
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";
import '../app/dashboardKaryawan.css';
import { LogOut, reset } from "../fitur/AuthKaryawan";
import { useDispatch, useSelector } from "react-redux";

export const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dataKaryawan, setDataKaryawan] = useState(null);
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState('');
    const [absensiData, setAbsensiData] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = now.toLocaleDateString('en-US', options);
            const formattedTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
            setCurrentTime(`${formattedDate} - ${formattedTime}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/MeKaryawan');
                setDataKaryawan(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        const fetchAbsensiHariIni = async () => {
            try {
                const response = await axios.get('http://localhost:5000/absensi/get'); // Gantilah URL ini sesuai endpoint API Anda
                setAbsensiData(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProfile();
        fetchAbsensiHariIni();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!dataKaryawan || !absensiData) {
        return <div>Loading...</div>;
    }

    const { absensiHariIni } = absensiData;
    const logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
      };
    return (
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
            <Card>
                <CardContent>
                    {dataKaryawan ? (
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={3}>
                                <Avatar alt={dataKaryawan.nama_lengkap} src="path-to-avatar-image.jpg" />
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="h6">{dataKaryawan.nama_lengkap}</Typography>
                                <Typography variant="body2">{dataKaryawan.jabatan}</Typography>
                            </Grid>
                        </Grid>
                    ) : (
                        <div>Loading...</div>
                    )}
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                        <Grid item xs={3}>
                            <Button onClick={logout} variant="outlined" fullWidth><IoLogOut />Keluar</Button>
                        </Grid>
                        {/* <button onClick={logout} className="button is-white">
              <IoLogOut />Logout
            </button> */}
                        <Grid item xs={3}>
                            <Button component={NavLink} to="/GetAbsen" variant="outlined" fullWidth>History</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button component={NavLink} to="/ijin" variant="outlined" fullWidth>Izin</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button component={NavLink} to="/users" variant="outlined" fullWidth>Profile</Button>
                        </Grid>
                    </Grid>
                    <Typography variant="body2" style={{ marginTop: '20px' }}>{currentTime}</Typography>
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                        {absensiHariIni ? (
                            <>
                                <Grid item xs={6}>
                                    <Button  variant="contained" color="primary" fullWidth>
                                        {absensiHariIni.jam_masuk || 'Clock In'}
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button  variant="contained" fullWidth>
                                        {absensiHariIni.jam_keluar || 'Anda Belum Absen Keluar'}
                                    </Button>
                                </Grid>
                            </>
                        ) : (
                            <Grid item xs={12}>
                                <Typography variant="body2" color="error">Anda belum absen hari ini.</Typography>
                            </Grid>
                        )}
                    </Grid>
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                       
                            <>
                                <Grid item xs={6}>
                                    <Button component={NavLink} to="/createAbsen" variant="contained" color="primary" fullWidth>
                                        Clock In
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button component={NavLink} to="/clockout" variant="contained" fullWidth>
                                       Clock Out
                                    </Button>
                                </Grid>
                            </>
                       
                    </Grid>
                    <Grid container spacing={2} style={{ marginTop: '20px' }}>
                        <Grid item xs={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="body2">Present</Typography>
                                    <Typography variant="h6">1 day</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="body2">Permission</Typography>
                                    <Typography variant="h6">0 day</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="body2">Sick</Typography>
                                    <Typography variant="h6">0 day</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="body2">Overdue</Typography>
                                    <Typography variant="h6">1 day</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Dashboard;
