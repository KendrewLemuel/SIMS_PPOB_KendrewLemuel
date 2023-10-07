import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import "./Account.css";
import { profileList } from "../../Api/Api";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import Popup from "../../Components/Popup/Popup";

const AccountEdit = () => {
  const [profile, setProfile] = useState({});

  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const closePopup = () => {
    setPopup(false);
    navigate("/account");
  };

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

  const [newProfile, setNewProfile] = useState({
    first_name: "",
    last_name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfile({
      ...newProfile,
      [name]: value,
    });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();

    axios
      .put(
        "https://take-home-test-api.nutech-integrasi.app/profile/update",
        newProfile,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("tokenId")}`,
          },
        }
      )
      .then((response) => {
        console.log("Profil berhasil diperbarui:", response.data);
        setPopup(true);
        setMessage("Profile berhasil di perbaharui!");

        setProfile(response.data);

        setNewProfile({
          first_name: "",
          last_name: "",
        });
      })
      .catch((error) => {
        console.error("Gagal memperbarui profil:", error.message);
      });
  };

  return (
    <>
      <Navbar />
      <div className="profile-wrapper">
        <div className="profile-content">
          <div className="profile-top">
            <a className=" profile-pict" href="/images">
              <img src={profile.profile_image} alt="" />
            </a>

            <h2>
              {profile.first_name} {profile.last_name}
            </h2>
          </div>
          <div className="profile-bot">
            <form className="profile-form">
              <label>Email</label>
              <input type="email" placeholder={profile.email} disabled />
              <label>Nama depan</label>
              <input
                type="text"
                name="first_name"
                placeholder={profile.first_name}
                value={newProfile.first_name}
                onChange={handleInputChange}
                required
              />

              <label>Nama Belakang</label>
              <input
                type="text"
                name="last_name"
                placeholder={profile.last_name}
                value={newProfile.last_name}
                onChange={handleInputChange}
                required
              />
              <button
                type="submit"
                onClick={handleProfileUpdate}
                className="btn-login"
              >
                Simpan
              </button>
              <Popup isOpen={popup} message={message} onClose={closePopup} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountEdit;
