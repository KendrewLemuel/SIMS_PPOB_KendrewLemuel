import React, { useState, useEffect } from "react";
import "./Hero.css";

import { profileData } from "../../Api/Api";
import { balanceData } from "../../Api/Api";

const Hero = () => {
  const [profile, setProfile] = useState([]);
  const [balance, setBalance] = useState([]);

  const [isBalanceHidden, setIsBalanceHidden] = useState(false);

  const toggleBalance = () => {
    setIsBalanceHidden(!isBalanceHidden);
  };

  const originalBalanceText = balance ? `Rp.${balance.balance}` : "Loading...";
  const hiddenBalanceText = "••••••••••";

  useEffect(() => {
    profileData()
      .then((response) => {
        console.log(response.data);
        setProfile(response.data.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    balanceData()
      .then((response) => {
        console.log(response.data);
        setBalance(response.data.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  return (
    <div className="hero-wrapper">
      <div className="hero-left">
        <img className="hero-img" src={profile.profile_image} alt="" />
        <p>Selamat datang,</p>
        <h2>
          {profile.first_name} {profile.last_name}
        </h2>
      </div>
      <div className="hero-right">
        <p>Saldo anda</p>
        <h1 id="saldoText">
          {isBalanceHidden ? hiddenBalanceText : originalBalanceText}
        </h1>
        <small className="lihat-saldo" onClick={toggleBalance}>
          lihat saldo
        </small>
      </div>
    </div>
  );
};

export default Hero;
