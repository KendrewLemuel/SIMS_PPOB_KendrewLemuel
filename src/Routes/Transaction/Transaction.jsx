import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import Navbar from "../../Components/Navbar/Navbar";
import Hero from "../../Components/Hero/Hero";
import "./Transaction.css";

const Transaction = () => {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("tokenId");
    const offset = 0;
    const limit = 5;

    axios
      .get(
        `https://take-home-test-api.nutech-integrasi.app/transaction/history?offset=${offset}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        const formattedHistoryData = response.data.data.records.map(
          (transaction) => ({
            ...transaction,
            created_on: format(
              new Date(transaction.created_on),
              "dd-MM-yyyy HH:mm:ss"
            ),
          })
        );
        setHistoryData(formattedHistoryData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <div className="history-wrapper">
        <h3>History Transaksi</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="history-content">
            {historyData.map((transaction) => (
              <div key={transaction.invoice_number} className="history-item">
                <div className="history-left">
                  <p className="history-amount">{transaction.total_amount}</p>
                  <p>{transaction.created_on}</p>
                </div>

                <div className="history-right">
                  <p>{transaction.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Transaction;
