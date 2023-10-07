import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { servicesList } from "../../Api/Api";
import Navbar from "../../Components/Navbar/Navbar";
import "./Payment.css";
import Hero from "../../Components/Hero/Hero";
import axios from "axios";
import Popup from "../../Components/Popup/Popup";

const Payment = () => {
  const { serviceCode } = useParams();
  const [service, setService] = useState(null);
  const [nominal, setNominal] = useState(0);

  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const token = sessionStorage.getItem("tokenId");

  const closePopup = () => {
    setPopup(false);
    navigate("/home");
  };

  useEffect(() => {
    servicesList()
      .then((response) => {
        const selectedService = response.data.data.find(
          (service) => service.service_code === serviceCode
        );
        setService(selectedService);
        setNominal(selectedService.service_tariff);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [serviceCode]);

  if (!service) {
    return <div>Loading...</div>;
  }

  const handlePayment = async () => {
    try {
      if (nominal <= 0) {
        alert("Saldo tidak mencukupi atau nominal tidak valid.");
        return;
      }

      const response = await axios.post(
        "https://take-home-test-api.nutech-integrasi.app/transaction",
        {
          service_code: serviceCode,
          amount: nominal,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPopup(true);

      setMessage(
        `Transaksi berhasil. <br/> Invoice Number: ${response.data.data.invoice_number}`
      );
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        alert("Server Error: " + error.response.data.message);
      } else if (error.request) {
        console.error("Request Error:", error.request);
        alert("Request Error: No response received from the server.");
      } else {
        console.error("Error:", error.message);
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Hero />
      <div className="transaction-wrapper">
        <h2>Pembayaran</h2>
        <div className="transaction-content">
          <img src={service.service_icon} alt={service.service_name} />
          <h4>{service.service_name} </h4>
        </div>
        <div className="transaction-form">
          <form className="transaction-form" action="">
            <input
              type="number"
              id="numericInput"
              placeholder={service.service_tariff}
              name="numericInput"
              min="0"
              onChange={(e) => setNominal(Number(e.target.value))}
              value={nominal}
            />
          </form>
          <button className="btn-transaction" onClick={handlePayment}>
            Bayar
          </button>
          <Popup isOpen={popup} message={message} onClose={closePopup} />
        </div>
      </div>
    </>
  );
};

export default Payment;
