import React, { useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import PropTypes from 'prop-types';

const GalleryPage = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const photos = images.map((url) => ({
    src: url,
    width: 4,
    height: 3,
  }));

  return (
    <div>
      
    </div>
  );
};

GalleryPage.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GalleryPage;
