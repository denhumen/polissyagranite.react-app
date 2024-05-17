import React from "react";
import "lightbox2/dist/js/lightbox-plus-jquery";
import "lightbox2/dist/css/lightbox.css";
import "../assets/css/gallery_item.css";

const GalleryItem = ({ imgUrl }) => {
    return (
        <a href={imgUrl} data-lightbox="gallery" className="galleryItemLink">
            <img src={imgUrl} alt="Image" className="galleryItemImage" />
        </a>
    );
};

export default GalleryItem;
