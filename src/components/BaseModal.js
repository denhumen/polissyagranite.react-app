import React, { useState } from 'react';
import Modal from 'react-modal';
import cross from '../assets/img/cross_modal.svg';
import '../assets/css/modal.css';

const BaseModal = ({ modalIsOpen, setModalIsOpen, onSubmit, title, children }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleModalClose = () => {
    setModalIsOpen(false);
    setImage(null);
    setImagePreview(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImage(file);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async () => {
    if (image) {
      await onSubmit(image);
      handleModalClose();
    } else {
      console.error("No image selected.");
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleModalClose}
      contentLabel={title}
      className="modal"
    >
      <button
        onClick={handleModalClose}
        style={{
          float: "right",
          cursor: "pointer",
          fontSize: "1.5rem",
          color: "#1B3544",
          background: "transparent",
          border: "none"
        }}
      >
        <img src={cross} alt="Close" />
      </button>
      <div>
        <h2 style={{ textAlign: "center" }}>{title}</h2>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        {imagePreview && (
          <div style={{ textAlign: "center", margin: "10px 0" }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "300px" }}
            />
          </div>
        )}
        {children}
        <button className="btn-primary" onClick={handleSubmit} style={{ margin: "10px auto", display: "block" }}>
          {title}
        </button>
      </div>
    </Modal>
  );
};

export default BaseModal;
