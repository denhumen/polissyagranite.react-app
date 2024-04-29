import React from 'react';
import Slider from 'react-slick';
import AddImageModal from './AddImageModal';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../assets/css/carousel.css';


const Carousel = ({ slides, isAdmin, setModalIsOpen }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
    };

    const handleAddClick = () => {
      setModalIsOpen(true);
    };

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="slide-content">
                        <img src={slide.image} alt={`Slide ${index}`} />
                        <div className="slide-info">
                            <h2>{slide.title}</h2>
                            <p>{slide.description}</p>
                            <button className="btn-primary">{slide.button1Text}</button>
                            <button className="btn-secondary">{slide.button2Text}</button>
                        </div>
                    </div>
                ))}
                {isAdmin && (
                    <div className="slide-content">
                        <div className="admin-plus-button" onClick={handleAddClick}>
                            <button className="btn-plus">+</button>
                        </div>
                    </div>
                )}
            </Slider>
        </div>
    );
};

export default Carousel;
