import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const FormEditDepartment = () => {
    const [nama_department, setNamaDepartment] = useState('');
    const [kode_department, setKodeDepartment] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getDepartmentById = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/department/${id}`);
                setKodeDepartment(response.data.kode_department);
                setNamaDepartment(response.data.nama_department);
            } catch (error) {
                if (error.response) {
                    setMessage(error.response.data.message);
                }
            }
        };
        getDepartmentById();
    }, [id, navigate, setMessage]);

    const updateDepartment = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/department/${id}`, {
                nama_department: nama_department,
                kode_department: kode_department
            });
            console.log(response.data);
            navigate('/department');
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            }
        }
    };

    return (
        <div>
            <h2 className="subtitle">Edit Department</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updateDepartment}>
                            <p className="has-text-centered">{message}</p>
                            <div className="field">
                                <label className="label">Nama Department</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={nama_department}
                                        onChange={(e) => setNamaDepartment(e.target.value)}
                                        placeholder="Silahkan ganti nama Department"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Kode Department</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        className="input"
                                        value={kode_department}
                                        onChange={(e) => setKodeDepartment(e.target.value)}
                                        placeholder="Edit kode Department"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-success">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
