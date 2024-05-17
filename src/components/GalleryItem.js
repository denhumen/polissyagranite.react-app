import React from "react";
import "lightbox2/dist/js/lightbox-plus-jquery";
import "lightbox2/dist/css/lightbox.css";

const GalleryItem = ({ imgUrl }) => {
    return (
            <a href={imgUrl} data-lightbox="gallery">
                <img src={imgUrl} alt="Image" style={{ cursor: 'pointer' }} />
            </a>
    );
};

export default GalleryItem;
