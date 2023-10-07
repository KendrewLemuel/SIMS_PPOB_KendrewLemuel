import React from "react";
import "./Popup.css";
import sucess from "../../assets/Success.png";

const Popup = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-message-overlay">
      <div className="popup-message-content">
        <div className="popup-message-body">
          <img src={sucess} alt="" />
          <p dangerouslySetInnerHTML={{ __html: message }}></p>
          <button onClick={onClose}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
