import React, { useState } from "react";
import "./Regist.css";
import axios from "axios";
import login from "../../assets/Illustrasi Login.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Notification from "../../Components/Popup/Notification";

const Regist = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const [notification, setNotification] = useState(false);

  const navigate = useNavigate();

  const registHandler = async (e) => {
    e.preventDefault();

    // Validasi email
    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      setErrors({ email: "Format email tidak valid" });
      return;
    }

    // Validasi password
    if (password.length < 8) {
      setErrors({ password: "Password harus minimal 8 karakter" });
      return;
    }

    // Validasi konfirmasi password
    if (password !== confirmPassword) {
      setErrors({
        confirmPassword: "Konfirmasi password tidak sama dengan password",
      });
      return;
    }

    const formData = {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    };

    await axios
      .post(
        "https://take-home-test-api.nutech-integrasi.app/registration",
        formData
      )
      .then(() => {
        setSuccessMessage("Registrasi berhasil");
        setNotification(true);

        setTimeout(() => {
          setNotification(false);
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        console.log(error.response.data);
        const errorMessage = error.response.data?.message;
        setErrors({ api: errorMessage });
      });
  };

  return (
    <div className="regist-wrapper">
      <div className="regist-left">
        <div className="regist-logo">
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
          Lengkapi data untuk <br /> membuat akun
        </h2>

        {notification && (
          <Notification
            message={successMessage}
            onClose={() => setNot(false)}
          />
        )}
        {errors.api && <p className="error">{errors.api}</p>}

        <form className="regist-form" onSubmit={registHandler}>
          <input
            type="email"
            placeholder="Masukan Email anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            required=""
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Nama Depan"
            id="fname"
            required=""
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Nama belakang"
            id="lname"
            required=""
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Buat password"
            id="password"
            required=""
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Konfirmasi password"
            id="confirmPassword"
            required=""
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
          <button className="btn-regist" type="submit">
            Registrasi
          </button>

          <small className="login">
            sudah punya akun? login
            <a href="/login"> di sini</a>
          </small>
        </form>
      </div>
      <div className="regist-right">
        <img src={login} alt="" />
      </div>
    </div>
  );
};

export default Regist;
