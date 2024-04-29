import Modal from "react-modal";
import "../assets/css/modal.css";
import { uploadImage } from "../firebase-communication/firebase-storage";
import { set } from "@firebase/database";
import { useState } from "react";
import { add_new_slider } from "../firebase-communication/firebase-database";

function AddImageModal({ modalIsOpen, setModalIsOpen, sliderId }) {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState();
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

  const handleFileUpload = async (e) => {
    setImage(e);
  };

  const handleAddImage = async () => {
    try {
      const imgUrl = await uploadImage(image);
      setUrl(imgUrl);
      console.log("Uploaded image URL:", imgUrl);

      await add_new_slider(sliderId, imgUrl, title, description);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUrl("");
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      contentLabel="Add Slide Modal"
    >
      <div>
        <h2>Add New Image</h2>
        <input type="file" accept="image/*" onChange={handleFileUpload} />
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

export default AddImageModal;
