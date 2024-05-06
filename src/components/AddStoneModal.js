import React, { useState } from 'react';
import Modal from 'react-modal';
import { uploadImage } from '../firebase-communication/firebase-storage';
import { add_stone_gallery_element } from '../firebase-communication/firebase-database';

function AddStoneModal({ modalIsOpen, setModalIsOpen }) {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setImage(e);
  };
  
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddStone = async () => {
    if (!image || title.trim() === '') {
      alert('Please provide both an image and a title.');
      return;
    }
    
    setUploading(true);
    try {
      const imgUrl = await uploadImage(image);
      await add_stone_gallery_element(imgUrl, title);
      alert('Stone added successfully!');
    } catch (error) {
      alert('Failed to add stone: ' + error.message);
    } finally {
      setModalIsOpen(false);
      setUploading(false);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      contentLabel="Add Stone Modal"
      ariaHideApp={false}
    >
      <div style={{ padding: '20px' }}>
        <h2>Add New Stone</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter title"
          style={{ margin: '10px 0', width: '100%' }}
        />
        <button onClick={handleAddStone} disabled={uploading}>
          {uploading ? 'Adding...' : 'Add Stone'}
        </button>
        <button onClick={() => setModalIsOpen(false)} style={{ float: 'right' }}>
          Close
        </button>
      </div>
    </Modal>
  );
}

export default AddStoneModal;
