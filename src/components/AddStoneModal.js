import React, { useState } from 'react';
import BaseModal from './BaseModal';
import { uploadImage } from '../firebase-communication/firebase-storage';
import { add_stone_gallery_element } from '../firebase-communication/firebase-database';

const AddStoneModal = ({ modalIsOpen, setModalIsOpen, reloadData }) => {
  const [title, setTitle] = useState("");

  const handleAddImage = async (image) => {
    try {
      const imgUrl = await uploadImage(image);
      await add_stone_gallery_element(imgUrl, title);
      await reloadData();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <BaseModal
      modalIsOpen={modalIsOpen}
      setModalIsOpen={setModalIsOpen}
      onSubmit={handleAddImage}
      title="Add New Stone"
    >
      <div className="input-stone-div">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </BaseModal>
  );
};

export default AddStoneModal;
