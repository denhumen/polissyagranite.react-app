import React from 'react';
import "../assets/css/catalog.css";
import CustomConfirm from '../helpers/CustomConfirm';
import { delete_stone_gallery_element } from '../firebase-communication/firebase-database';

const CatalogItem = ({ item, isAdmin, refreshCatalog }) => {
  const handleDelete = (id, imgUrl) => {
    CustomConfirm({
      message: "Are you sure you want to delete this item?",
      onConfirm: async () => {
        try {
          await delete_stone_gallery_element(id, imgUrl);
          await refreshCatalog();
        } catch (error) {
          console.error("Failed to delete the item: " + error.message);
        }
      },
      onCancel: () => {
        console.log("Deletion cancelled.");
      }
    });
  };

  return (
    <div className="catalogItem">
      <img src={item.img_url} alt={item.title} className="catalogImage" />
      <p className="catalogCaption">{item.title}</p>
      {isAdmin && (
        <button
          className="deleteButton"
          onClick={() => handleDelete(item.id, item.img_url)}
          style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer' }}
        >
          X
        </button>
      )}
    </div>
  );
};

export default CatalogItem;