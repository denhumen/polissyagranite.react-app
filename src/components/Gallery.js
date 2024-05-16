import { useState } from "react";
import AddGalleryImageModal from "./AddGalleryImageModal"


const Gallery = ({images, parentSliderId, sliderId, isAdmin}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleAddClick = () => {
        setModalIsOpen(true);
    };

    return (
        <div>
            <AddGalleryImageModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} parentSliderId={parentSliderId} sliderId={sliderId} />
            <h2>Gallery</h2>
            <ul>
                {images.map(image => (
                    <li key={image.id}>
                        <img src={image.img_url} alt={image.title} />
                        <h3>{image.title}</h3>
                        <p>{image.description}</p>
                    </li>
                ))}
            </ul>
            <button onClick={handleAddClick}>Add new image</button>
        </div>
    )
}

export default Gallery;