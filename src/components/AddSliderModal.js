import Modal from "react-modal";
import "../assets/css/modal.css";
import { uploadImage } from "../firebase-communication/firebase-storage";
import { set } from "@firebase/database";
import { useState } from "react";
import { add_new_slider } from "../firebase-communication/firebase-database";
import cross from "../assets/img/cross_modal.svg";


function AddSliderModal({ modalIsOpen, setModalIsOpen, sliderId }) {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  
  const [title, setTitle] = useState({
    ua: "",
    en: "",
    pl: "",
  });

  const [description, setDescription] = useState({
    ua: "",
    en: "",
    pl: "",
  });


  const handleModalClose = () => {
    setModalIsOpen(false);
    setImage(null);
    setImagePreview(null);
    setTitle({ ua: "", en: "", pl: "" });
    setDescription({ ua: "", en: "", pl: "" });
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

      await add_new_slider(sliderId, imgUrl, title, description);
      handleModalClose();
      // window.location.reload();
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
      contentLabel="Add Slide Modal"
      className="modal"
    >
      <button
        onClick={() => setModalIsOpen(false)}
        style={{ float: "right", cursor: "pointer", fontSize: "1.5rem" }}
      >
      <img src={cross} alt="Close" />
      </button>
      <div>
        <h2 style={{ textAlign: "center" }}>Add New Image</h2>
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
        <div className="input-div">
          <input
            type="text"
            placeholder="Title in Ukrainian"
            value={title.uk}
            onChange={(e) => setTitle({ ...title, ua: e.target.value })}
          />
          <input
            type="text"
            placeholder="Title in English"
            value={title.en}
            onChange={(e) => setTitle({ ...title, en: e.target.value })}
          />
          <input
            type="text"
            placeholder="Title in Polish"
            value={title.pl}
            onChange={(e) => setTitle({ ...title, pl: e.target.value })}
          />
        </div>
        <div className="input-div">
          <input
            type="text"
            placeholder="Description in Ukrainian"
            value={description.uk}
            onChange={(e) =>
              setDescription({ ...description, ua: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description in English"
            value={description.en}
            onChange={(e) =>
              setDescription({ ...description, en: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description in Polish"
            value={description.pl}
            onChange={(e) =>
              setDescription({ ...description, pl: e.target.value })
            }
          />
        </div>

        <button className="btn-primary" onClick={handleAddImage}>
          Add Image
        </button>
      </div>
    </Modal>
  );
}

export default AddSliderModal;
