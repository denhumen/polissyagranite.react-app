import React, { useState, useEffect } from "react";
import DropDownCartMenu from "./DropDownCartMenu";
import "../assets/css/shopping_cart.css";
import { useTranslation } from "react-i18next";

function ShoppingCartElement({
  imgUrl,
  title,
  handleRemove,
  index,
  collectData,
}) {
  const [expanded, setExpanded] = useState(false);
  const [t, i18n] = useTranslation("global");
  const lang = i18n.language;

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData")) || {};
    if (savedData[index]) {
      collectData(index, savedData[index]);
    }
  }, [index, collectData]);

  const handleExpand = (e) => {
    if (e.target.closest(".form-shopping-cart")) {
      return;
    }
    setExpanded(!expanded);
  };

  return (
    <div className={`cart-item ${expanded ? "expanded" : ""}`} onClick={handleExpand}>
      <img src={imgUrl} alt="cart item" />
      <h2>{title[lang]}</h2>
      <button
        className="btn-remove"
        onClick={(e) => {
          e.stopPropagation();
          handleRemove(index);
        }}
      >
        <i className="fas fa-trash-alt"></i>
      </button>
      {expanded && (
        <DropDownCartMenu
          collectData={(data) => {
            collectData(index, data);
          }}
          initialData={JSON.parse(localStorage.getItem("formData"))?.[index]}
        />
      )}
    </div>
  );
}

export default ShoppingCartElement;
