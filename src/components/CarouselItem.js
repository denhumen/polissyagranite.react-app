import React from "react";
import { useTranslation } from "react-i18next";
import "@fortawesome/fontawesome-free/css/all.css";
import { useNavigate } from "react-router-dom";
import CustomConfirm from "../helpers/CustomConfirm";
import { delete_gallery, delete_slider } from "../firebase-communication/firebase-database";
import "../assets/css/carousel.css";

const CarouselItem = ({ slide, slides, isAdmin, refreshSliderGroups }) => {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const lang = i18n.language;

  const handleOrderClick = (imgUrl, title) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ imgUrl, title });
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleDeleteSlide = async (slideId, imgUrl) => {
    CustomConfirm({
      message: "Are you sure you want to delete this item?",
      onConfirm: async () => {
        await delete_slider(slides.id, slideId, imgUrl);
        await delete_gallery(slides.id, slideId);
        await refreshSliderGroups();
      },
      onCancel: () => {
        console.log("Deletion cancelled.");
      }
    });
  };

  const handleOnclickShowMore = async (parentId, slideId) => {
    navigate(`/gallery/${parentId}/${slideId}`);
  };

  return (
    <div className="slide-content">
      <img
        className="slider-image"
        src={slide.img_url}
        alt={`Slide ${slide.id}`}
      />
      <div className="slide-info">
        <h2>{slide.title[lang]}</h2>
        <p>{slide.description[lang]}</p>
        <button className="btn-primary">
          <a
            href="/order"
            onClick={() => handleOrderClick(slide.img_url, slide.title)}
          >
            {t("buttons.order-button")}
          </a>
        </button>
        <button className="btn-primary" onClick={() => handleOnclickShowMore(slides.id, slide.id)}>
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
  );
};

export default CarouselItem;
