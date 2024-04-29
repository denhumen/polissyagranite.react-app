import Modal from "react-modal";
import "../assets/css/modal.css";
import { uploadImage } from "../firebase-communication/firebase-storage";
import { set } from "@firebase/database";
import { useState } from "react";
import { add_new_slider } from "../firebase-communication/firebase-database";

function AddImageModal({ modalIsOpen, setModalIsOpen }) {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState();
  const [title, setTitle] = useState({
    uk: "",
    en: "",
    pl: "",
  });

  const [description, setDescription] = useState({
    uk: "",
    en: "",
    pl: "",
  });

  const handleFileUpload = async (e) => {
    setImage(e);
  };

  const handleAddImage = async () => {
    try {
      const url = await uploadImage(image);
      setUrl(url);
      console.log("Uploaded image URL:", url);
    } catch (error) {
      setUrl("");
      console.error("Error uploading image:", error);
    }
    add_new_slider() //======================================================================================================================
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      contentLabel="Add Image Modal"
    >
      <div>
        <h2>Add New Image</h2>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        <div className="input-div">
          <input
            type="text"
            placeholder="Title in Ukrainian"
            value={title.uk}
            onChange={(e) => setTitle({ ...title, uk: e.target.value })}
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
              setDescription({ ...description, uk: e.target.value })
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

export default AddImageModal;
