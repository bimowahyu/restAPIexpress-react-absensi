import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const ProfileAdmin = () => {
    const [profile, setProfile] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/Me`);
                setProfile(response.data);
            } catch (error) {
                setMessage(error.message);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>{profile.name}</td>
                        <td>{profile.email}</td>
                        <td>{profile.role}</td>
                        <td>
          <Link to={`/admin/edit/${profile.id}`} className="button is-small is-info">
            Edit
          </Link>
         
        </td>
                    </tr>
                </tbody>
            </table>
            {message && <p>{message}</p>}
        </div>
    );
};
