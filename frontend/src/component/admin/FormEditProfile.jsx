import React ,{useState, useEffect}from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

export const FormEditProfile = () => {

    const [profile, setProfile] = useState({})
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const { id } = useParams();

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
    }, [id, navigate, setMessage]);

    const updateProfile = async (e)=> {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/users/${id}`,{
                name: name,
                email: email,
                password: password
            })
            
            console.log(response.data)
            navigate('/admin')

        } catch (error) {
            setMessage(error.response.data.message);
        }
    }

  return (
    <div>
    <h2 className="subtitle">Edit Profile</h2>
    <div className="card is-shadowless">
        <div className="card-content">
            <div className="content">
                <form onSubmit={updateProfile}>
                    <p className="has-text-centered">{message}</p>
                    <div className="field">
                        <label className="label">Nama</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Silahkan ganti nama"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input
                                type="email"
                                className="input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Edit Email"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input
                                 type="password"
                                 className="input"
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 placeholder="******"
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
  )
}
