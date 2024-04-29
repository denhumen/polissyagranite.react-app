import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../assets/css/carousel.css';

const Carousel = ({ slides, isAdmin, lang = 'en' }) => {
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
        console.log("Add new slide clicked!"); // Implement your functionality here
    };

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="slide-content">
                        <img src={slide.image} alt={`Slide ${index}`} />
                        <div className="slide-info">
                            <h2>{slide.title[lang]}</h2>  {/* Access specific language */}
                            <p>{slide.description[lang]}</p>  {/* Access specific language */}
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
