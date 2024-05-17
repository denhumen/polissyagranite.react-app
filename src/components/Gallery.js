import React, { useState } from "react";
import AddGalleryImageModal from "./AddGalleryImageModal";
import GalleryItem from "./GalleryItem";
import "lightbox2/dist/js/lightbox-plus-jquery";
import "lightbox2/dist/css/lightbox.css";
import "../assets/css/gallery.css";
import { delete_image_from_gallery } from "../firebase-communication/firebase-database";

const Gallery = ({ images, parentSliderId, sliderId, reloadData, isAdmin }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleAddClick = () => {
        setModalIsOpen(true);
    };

    const handleDeleteImage = async (imageId, imgUrl) => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            try {
                await delete_image_from_gallery(parentSliderId, sliderId, imageId, imgUrl);
                alert("Image deleted successfully!");
                reloadData();
            } catch (error) {
                alert("Failed to delete the image: " + error.message);
            }
        }
    };

    return (
        <div className="galleryContainer">
            <AddGalleryImageModal 
                modalIsOpen={modalIsOpen} 
                setModalIsOpen={setModalIsOpen} 
                parentSliderId={parentSliderId} 
                sliderId={sliderId} 
                reloadData={reloadData} 
            />
            <ul className="galleryList">
                {images.map(image => (
                    <li key={image.id} className="galleryItem">
                        <GalleryItem imgUrl={image.img_url} />
                        {isAdmin && (
                            <button className="btn-delete" onClick={() => handleDeleteImage(image.id, image.img_url)} title="Delete Image">
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        )}
                    </li>
                ))}
                {isAdmin && (
                    <li className="galleryItem addButtonContainer" onClick={handleAddClick}>
                        <button className="addButton">+</button>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Gallery;
