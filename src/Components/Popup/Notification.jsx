import React from "react";
import "./Notification.css";

const Notification = ({ message, onClose }) => {
  return (
    <div className="notification">
      <p>{message}</p>
      <button onClick={onClose}>Tutup</button>
    </div>
  );
};

export default Notification;
