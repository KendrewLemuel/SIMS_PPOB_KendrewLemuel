import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import Hero from "../../Components/Hero/Hero";

import "./Topup.css";
import Popup from "../../Components/Popup/Popup";

const Topup = () => {
  const [nominal, setNominal] = useState("");
  const [message, setMessage] = useState("");

  const [popupOpen, setPopupOpen] = useState(false);
  const token = sessionStorage.getItem("tokenId");

  const handlePayment = (value) => {
    setNominal(value);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    window.location.reload();
  };

  const handleTopup = async () => {
    try {
      if (nominal <= 0) {
        setMessage("Gagal melakukan top-up. Pastikan jumlah nominal valid.");
        return;
      }

      await axios.post(
        "https://take-home-test-api.nutech-integrasi.app/topup",
        { top_up_amount: nominal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const top_up_amount = nominal;

      setPopupOpen(true);

      setMessage(
        `Top-up sebesar <br/> Rp${top_up_amount} <br/> berhasil dilakukan.`
      );
    } catch (error) {
      setMessage("Gagal melakukan top-up. Pastikan jumlah nominal valid.");
    }
  };

  return (
    <>
      <Navbar />
      <Hero />
      <div className="top-wrapper">
        <div className="top-top">
          <p>Silahkan Masukan</p>
          <h2>Nominal Top up</h2>
        </div>
        <div className="top-content">
          <div className="top-bottom">
            <div className="bottom-left">
              <form className="topup-form" action="">
                <input
                  type="number"
                  id="numericInput"
                  placeholder="Masukan nominal Topup"
                  name="numericInput"
                  value={nominal}
                  min="0"
                  onChange={(e) => setNominal(e.target.value)}
                />
              </form>
              <button className="btn-topup" onClick={handleTopup}>
                Top up
              </button>
              <Popup
                isOpen={popupOpen}
                message={message}
                onClose={handleClosePopup}
              />
            </div>
            <div className="bottom-right">
              <button className="payment" onClick={() => handlePayment(10000)}>
                Rp10.000
              </button>
              <button className="payment" onClick={() => handlePayment(20000)}>
                Rp20.000
              </button>
              <button className="payment" onClick={() => handlePayment(50000)}>
                Rp50.000
              </button>
              <button className="payment" onClick={() => handlePayment(100000)}>
                Rp100.000
              </button>
              <button className="payment" onClick={() => handlePayment(250000)}>
                Rp250.000
              </button>
              <button className="payment" onClick={() => handlePayment(500000)}>
                Rp500.000
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topup;
