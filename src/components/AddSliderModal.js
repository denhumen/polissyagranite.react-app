import React, { useState } from 'react';
import BaseModal from './BaseModal';
import { uploadImage } from '../firebase-communication/firebase-storage';
import { add_new_slider } from '../firebase-communication/firebase-database';

const AddSliderModal = ({ modalIsOpen, setModalIsOpen, sliderId, reloadData }) => {
  const [title, setTitle] = useState({ ua: "", en: "", pl: "" });
  const [description, setDescription] = useState({ ua: "", en: "", pl: "" });

  const handleAddImage = async (image) => {
    try {
      const imgUrl = await uploadImage(image);
      await add_new_slider(sliderId, imgUrl, title, description);
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
      title="Add New Slider"
    >
      <div className="input-div">
        <input
          type="text"
          placeholder="Title in Ukrainian"
          value={title.ua}
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
          value={description.ua}
          onChange={(e) => setDescription({ ...description, ua: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description in English"
          value={description.en}
          onChange={(e) => setDescription({ ...description, en: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description in Polish"
          value={description.pl}
          onChange={(e) => setDescription({ ...description, pl: e.target.value })}
        />
      </div>
    </BaseModal>
  );
};

export default AddSliderModal;