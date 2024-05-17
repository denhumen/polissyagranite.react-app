import React, { useState } from "react";
import Slider from "react-slick";
import AddSliderModal from "./AddSliderModal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/carousel.css";
import { useTranslation } from "react-i18next";
import "@fortawesome/fontawesome-free/css/all.css";
import { delete_slider } from "../firebase-communication/firebase-database";
import { useNavigate } from "react-router-dom";

const Carousel = ({ slides, isAdmin, refreshSliderGroups }) => {
  const [t, i18n] = useTranslation("global");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  const lang = i18n.language;

  const handleAddClick = () => {
    setModalIsOpen(true);
  };

  const handleOrderClick = (imgUrl, title) => {
    // append to a list in local storage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ imgUrl, title });
    localStorage.setItem("cart", JSON.stringify(cart));

  }

  const handleDeleteSlide = async (slideId, imgUrl) => {
    await delete_slider(slides.id, slideId, imgUrl);
    await refreshSliderGroups();
  };

  const handleOnclickShowMore = async (parentId, slideId) => {
    navigate(`/gallery/${parentId}/${slideId}`);
  };

  const sliderContent = Array.isArray(slides.sliders)
    ? slides.sliders.map((slide, index) => (
        <div key={index} className="slide-content">
          <img
            className="slider-image"
            src={slide.img_url}
            alt={`Slide ${index}`}
          />
          <div className="slide-info">
            <h2>{slide.title[lang]}</h2>
            <p>{slide.description[lang]}</p>
            <a
              href="/order"
              onClick={() => handleOrderClick(slide.img_url, slide.title)}
            >
              <button className="btn-primary">
                {t("buttons.order-button")}
              </button>
            </a>
            <button
              className="btn-primary"
              onClick={() => handleOnclickShowMore(slides.id, slide.id)}
            >
              {t("buttons.more-button")}
            </button>
          </div>
          {isAdmin && (
            <button
              className="btn-delete"
              onClick={() => handleDeleteSlide(slide.id, slide.img_url)}
              title="Delete Slide"
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          )}
        </div>
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
