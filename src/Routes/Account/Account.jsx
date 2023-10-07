import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Account.css";
import { profileList } from "../../Api/Api";
import { useNavigate } from "react-router-dom";
import img from "../../assets/Profile Photo.png";

const Account = () => {
  const [profile, setProfile] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    profileList()
      .then((response) => {
        console.log(response.data);
        setProfile(response.data.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const handleLogout = () => {
    // Hapus sesi/token dari sessionStorage
    sessionStorage.removeItem("tokenId");
    // Navigasi kembali ke halaman login
    navigate("/");
  };
  return (
    <>
      <Navbar />
      <div className="profile-wrapper">
        <div className="profile-content">
          <div className="profile-top">
            <img src={profile.profile_image} alt="" />

            <h2>
              {profile.first_name} {profile.last_name}
            </h2>
          </div>
          <div className="profile-bot">
            <form className="profile-form">
              <label>Email</label>
              <input type="email" placeholder={profile.email} disabled />
              <label>Email</label>
              <input type="text" placeholder={profile.first_name} disabled />

              <label>Nama Depan</label>
              <input type="text" placeholder={profile.last_name} disabled />
              <a className="btn-login" href="/accountEdit">
                Edit Profile
              </a>

              <button
                className="btn-logout"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
