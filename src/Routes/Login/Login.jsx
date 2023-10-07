import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import login from "../../assets/Illustrasi Login.png";
import logo from "../../assets/logo.png";
import Popup from "../../Components/Popup/Popup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const closePopup = () => {
    setPopup(false);
    navigate("/home");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      setErrorMessage("Format email tidak valid");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password harus minimal 8 karakter");
      return;
    }

    try {
      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.app/login",
        {
          email,
          password,
        }
      );

      const token = response.data.data.token;
      sessionStorage.setItem("tokenId", token);
      setPopup(true);

      setMessage("Selamat datang di SIMS PPOB");
    } catch (error) {
      console.error("Terjadi kesalahan saat login", error);
      setErrorMessage("Terjadi kesalahan saat login");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-left">
        <div className="login-logo">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="title">
            <a href="/">
              <h4>SIMS PPOB</h4>
            </a>
          </div>
        </div>
        <h2>
          Masuk atau buat akun <br /> untuk memulai
        </h2>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukan Email anda"
            required=""
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukan Password anda"
            required=""
          />
          <button className="btn-login" type="submit">
            Masuk
          </button>
          <Popup isOpen={popup} message={message} onClose={closePopup} />
          <small className="regist">
            belum punya akun? registrasi
            <a href="/regist"> di sini</a>
          </small>
        </form>
      </div>
      <div className="login-right">
        <img src={login} alt="" />
      </div>
    </div>
  );
};

export default Login;
