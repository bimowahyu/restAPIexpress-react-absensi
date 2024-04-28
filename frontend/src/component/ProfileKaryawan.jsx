import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoPerson } from 'react-icons/io5';
import { getMe } from '../fitur/AuthKaryawan';

const ProfileKaryawan = () => {
    const [dataKaryawan, setDataKaryawan] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Panggil fungsi getMe untuk mendapatkan data karyawan yang sedang login
                const response = await axios.get('http://localhost:5000/MeKaryawan'); // Harap perhatikan bahwa getMe harus mengembalikan data karyawan yang sedang login
                setDataKaryawan(response.data); // Simpan data karyawan ke dalam state
            } catch (error) {
                setError(error.message); // Tangani kesalahan jika terjadi
            }
        };

        fetchProfile(); // Panggil fungsi fetchProfile saat komponen dimuat
    }, []);

    // Jika terjadi kesalahan dalam pengambilan data, tampilkan pesan kesalahan
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Tampilkan data karyawan jika sudah tersedia
    return (
        <div>
            {dataKaryawan ? (
                <div>
                     <IoPerson />
                    <h1>Profile Karyawan</h1>
                    <div>
                       
                        <span><p>Nama:</p>{dataKaryawan.nama_lengkap}</span>
                       
                    </div>
                    <span><p>Jabatan:{dataKaryawan.jabatan}</p></span>
                    {/* Tampilkan informasi karyawan lainnya sesuai kebutuhan */}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default ProfileKaryawan;
