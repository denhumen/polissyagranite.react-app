import React, { useState } from "react";
import Slider from "react-slick";
import AddSliderModal from "./AddSliderModal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/carousel.css";
import CarouselItem from "./CarouselItem";

const Carousel = ({ slides, isAdmin, refreshSliderGroups }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  const handleAddClick = () => {
    setModalIsOpen(true);
  };

  const sliderContent = slides.sliders && typeof slides.sliders === 'object'
    ? Object.values(slides.sliders).map((slide, index) => (
        <CarouselItem
          key={index}
          slide={slide}
          slides={slides}
          isAdmin={isAdmin}
          refreshSliderGroups={refreshSliderGroups}
        />
      ))
    : null;

  return (
    <div className="carousel-container">
      <AddSliderModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        sliderId={slides.id}
        reloadData={refreshSliderGroups}
      />
      <Slider {...settings}>
        {sliderContent}
        {isAdmin && (
          <div className="slide-content">
            <div className="admin-plus-button" onClick={handleAddClick}>
              <button>+</button>
            </div>
          </div>
        )}
      </Slider>
    </div>
  );
};

export default Carousel;