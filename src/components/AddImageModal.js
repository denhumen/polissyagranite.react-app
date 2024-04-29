import Modal from "react-modal";
import "../assets/css/modal.css";
import { uploadImage } from "../firebase-communication/firebase-storage";
import { set } from "@firebase/database";
import { useState } from "react";

function AddImageModal({ modalIsOpen, setModalIsOpen }) {
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  
  const handleFileUpload = async (e) => {
    setImage(e.target.files[0]);
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
          <input type="text" placeholder="Title in Ukrainian" required />
          <input type="text" placeholder="Title in English" required />
          <input type="text" placeholder="Title in Polish" required />
        </div>
        <div className="input-div">
          <input type="text" placeholder="Description in Ukrainian" required />
          <input type="text" placeholder="Description in English" required />
          <input type="text" placeholder="Description in Polish" required />
        </div>
        {/* submit button */}
        {/* try {
                    const url = await uploadImage(e);
                    setUrl(url);
                    console.log('Uploaded image URL:', url);
                } catch (error) {
                    setUrl('');
                    console.error('Error uploading image:', error);
                } */}
        <button
          className="btn-primary"
          onClick={async () => {
            try {
              const url = await uploadImage(image);
              setUrl(url);
              console.log("Uploaded image URL:", url);
            } catch (error) {
              setUrl("");
              console.error("Error uploading image:", error);
            }
          }}
        >
          Add Image
        </button>
      </div>
    </Modal>
  );
}

export default AddImageModal;
