import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginUser, reset } from "../fitur/AuthKaryawan";

const LoginKaryawan = () => {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);
  const Auth = (e) => {
    e.preventDefault();
    if (!nik || !password) {
      // Menampilkan pesan kesalahan jika NIK atau password kosong
      alert("NIK dan password harus diisi!");
      return;
    }
    dispatch(LoginUser({ nik, password }));
  };

  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={Auth} className="box">
                {isError && <p className="has-text-centered">{message}</p>}
                {/* <h1 className="title is-2">Log In</h1> */}
                <div className="field">
                  <label className="label">Nik</label>
                  <div className="control">
                    <input
                      type="number" // Menggunakan type="number" agar hanya menerima nilai numerik
                      className="input"
                      value={nik} // Menggunakan nilai state untuk nilai input
                      onChange={(e) => setNik(e.target.value)}
                      placeholder="Nik"
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
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginKaryawan;
