import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup/Popup";

const Images = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const closePopup = () => {
    setPopup(false);
    navigate("/account");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Pilih gambar terlebih dahulu");
      return;
    }
    if (selectedFile.size > 100 * 1024) {
      alert("Ukuran gambar terlalu besar. Maksimum 100 KB diperbolehkan.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.put(
        "https://take-home-test-api.nutech-integrasi.app/profile/image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("tokenId")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setPopup(true);

        setMessage("Gambar Profile berhasil di perbaharui");
        setSelectedFile(null);
        setPreviewImage(null);
      } else {
        alert("Terjadi kesalahan saat mengupdate profile image");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-wrapper">
        <div className="profile-content">
          <div className="profile-top">
            <h2>Upload Profile Image</h2>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                style={{ maxWidth: "100%" }}
              />
            )}
            <input
              type="file"
              accept=".jpeg, .jpg, .png"
              onChange={handleFileChange}
            />
            <button onClick={handleUpload}>Upload</button>
            <Popup isOpen={popup} message={message} onClose={closePopup} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Images;
