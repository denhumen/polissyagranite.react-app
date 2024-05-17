import React from 'react';
import BaseModal from './BaseModal';
import { uploadImage } from '../firebase-communication/firebase-storage';
import { add_image_to_gallery } from '../firebase-communication/firebase-database';

const AddGalleryImageModal = ({ modalIsOpen, setModalIsOpen, parentSliderId, sliderId, reloadData }) => {
  const handleAddImage = async (image) => {
    try {
      const imgUrl = await uploadImage(image);
      await add_image_to_gallery(parentSliderId, sliderId, imgUrl);
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
      title="Add New Image"
    />
  );
};

export default AddGalleryImageModal;
