import Modal from "react-modal";
import "../assets/css/modal.css";
import { uploadImage } from "../firebase-communication/firebase-storage";
import { set } from "@firebase/database";
import { useState } from "react";
import { add_stone_gallery_element } from "../firebase-communication/firebase-database";
import cross from "../assets/img/cross_modal.svg";

function AddStoneModal({ modalIsOpen, setModalIsOpen, sliderId, reloadData }) {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  
  const [title, setTitle] = useState("");

  const handleModalClose = () => {
    setModalIsOpen(false);
    setImage(null);
    setImagePreview(null);
    setTitle("");
    setUrl("");
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(e);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleAddImage = async () => {
    try {
      const imgUrl = await uploadImage(image);
      setUrl(imgUrl);
      console.log("Uploaded image URL:", imgUrl);
      await add_stone_gallery_element(imgUrl, title);
      handleModalClose();
      await reloadData();
    } catch (error) {
      console.error("Error uploading image:", error);
      setUrl("");
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => {
        handleModalClose();
      }}
      contentLabel="Add Stone"
      className="modal"
    >
      <button
        onClick={() => setModalIsOpen(false)}
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
        <h2 style={{ textAlign: "center" }}>Add New Stone</h2>
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
        <div className="input-stone-div">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <button className="btn-primary" onClick={handleAddImage}
        style={{
          margin: "10px auto",
          display: "block",
        }}>
          Add Stone
        </button>
      </div>
    </Modal>
  );
}

export default AddStoneModal;