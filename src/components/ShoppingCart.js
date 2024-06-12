import React, { useState, useEffect } from "react";
import "../assets/css/shopping_cart.css";
import ShoppingCartElement from "./ShoppingCartElement";
import emailjs from "emailjs-com";
import { get_stone_gallery } from "../firebase-communication/firebase-database";
import { useTranslation } from "react-i18next";
import { notifyError, notifySuccess } from "../toast-config";

const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const userId = process.env.REACT_APP_EMAILJS_USER_ID;
const userEmail = process.env.REACT_APP_USER_EMAIL;

function ShoppingCart() {
  const [orderedItems, setOrderedItems] = useState([]);
  const [formData, setFormData] = useState({});
  const [stoneGallery, setStoneGallery] = useState([]);
  const [t, i18n] = useTranslation("global");

  const fetchOrderedItems = () => {
    setOrderedItems(JSON.parse(localStorage.getItem("cart")) || []);
  };

  const handleRemove = (index) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    setOrderedItems(cart); // Update state directly
  };

  const collectData = (index, data) => {
    const updatedFormData = {
      ...formData,
      [index]: data,
    };
    setFormData(updatedFormData);
    localStorage.setItem("formData", JSON.stringify(updatedFormData)); // Save to local storage
  };

  useEffect(() => {
    get_stone_gallery().then((stones) => {
      setStoneGallery(stones);
    });
    fetchOrderedItems();
    const savedFormData = JSON.parse(localStorage.getItem("formData")) || {};
    setFormData(savedFormData); // Load saved form data
  }, []);

  const formatDescription = (data) => {
    return Object.entries(data)
      .map(([index, item]) => {
        const stone = stoneGallery.find((stone) => stone.id === item.stone);
        return `Пункт ${parseInt(index) + 1}:
      - Розмірність: ${item.measure || "Не вказано"}
      - Ширина: ${item.width || "Не вказано"}
      - Довжина: ${item.length || "Не вказано"}
      - Висота: ${item.height || "Не вказано"}
      - Камінь: ${stone?.title || "Не вказано"}
      - Розмірність кількості: ${item.quantity_measure || "Не вказано"}
      - Кількість: ${item.quantity || "Не вказано"}
      - Номер телефону: ${item.phoneNumber || "Не вказано"}\n\n`;
      })
      .join("");
  };

  const handleSendEmail = () => {
    if (orderedItems.length === 0) {
      notifyError(t("shoppingCart.emptyCart"));
      return;
    }
    if (Object.keys(formData).length === 0) {
      notifyError(t("shoppingCart.orderError"));
      return;
    }
    for (const key in formData) {
      const item = formData[key];
      if (
        !item.measure ||
        !item.width ||
        !item.length ||
        !item.height ||
        !item.stone ||
        !item.quantity_measure ||
        !item.quantity ||
        !item.phoneNumber
      ) {
        notifyError(t("shoppingCart.orderError"));
        return;
      }
    }

    const description = formatDescription(formData);
    const templateParams = {
      to_email: userEmail,
      message: description,
    };

    emailjs
      .send(serviceId, templateId, templateParams, userId)
      .then(
        (response) => {
          notifySuccess(t("shoppingCart.orderSuccess"));
          console.log("OK", response.status, response.text);
        },
        (error) => {
          console.log("FAILED", error);
        }
      )
      .then(() => {
        localStorage.removeItem("cart");
        setOrderedItems([]); // Update state
      });
  };

  return (
    <div className="shopping-cart">
      <div className="cart-items">
        {orderedItems.length === 0 ? (
          <p>{t("shoppingCart.emptyCart")}</p>
        ) : (
          orderedItems.map((item, index) => (
            <ShoppingCartElement
              key={index}
              index={index}
              imgUrl={item.imgUrl}
              title={item.title}
              handleRemove={handleRemove}
              collectData={collectData}
            />
          ))
        )}
      </div>
      <button onClick={handleSendEmail} className="order-button">
        {t("shoppingCart.orderButton")}
      </button>
    </div>
  );
}

export default ShoppingCart;
