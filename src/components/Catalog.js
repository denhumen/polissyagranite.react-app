import React, { useState } from 'react';
import AddStoneModal from './AddStoneModal';
import '../assets/css/catalog.css';
import { delete_stone_gallery_element } from '../firebase-communication/firebase-database';
import CustomConfirm from '../helpers/CustomConfirm';
import { notifyError, notifySuccess } from '../toast-config';

const Catalog = ({ catalogData, isAdmin, refreshCatalog }) => {
    const [addImage, setAddImage] = useState(false);

    const handleAddClick = () => {
        setAddImage(true);
    };

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
        <div className="catalogContainer">
            <AddStoneModal modalIsOpen={addImage} setModalIsOpen={setAddImage} reloadData={refreshCatalog} />

            {catalogData.map((item) => (
                <div key={item.id} className="catalogItem">
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
            ))}

            {isAdmin && (
                <div className="addButtonWrapper">
                    <div className="addButtonContainer" onClick={handleAddClick}>
                        <button className="addButton">+</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Catalog;
