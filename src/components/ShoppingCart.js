import React, { useState, useEffect } from "react";
import "../assets/css/shopping_cart.css";
import ShoppingCartElement from "./ShoppingCartElement";
import emailjs from "emailjs-com";
import { get_stone_gallery } from "../firebase-communication/firebase-database";
import { useTranslation } from "react-i18next";


const serviceId = "service_2vm4ala";
const templateId = "template_oksmh3k";
const userId = "_Fd5BeqFyIorI_QiH";
const userEmail = "crunchywatermeloncrab@gmail.com";

function ShoppingCart() {
  const orderedItems = JSON.parse(localStorage.getItem("cart")) || [];
  const [formData, setFormData] = useState({});
  const [stoneGallery, setStoneGallery] = useState([]);
  const [t, i18n] = useTranslation("global");

  const handleRemove = (index) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
  };

  const collectData = (index, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [index]: data,
    }));
  };

  useEffect(() => {
    get_stone_gallery().then((stones) => {
      setStoneGallery(stones);
    });
  }, []);

  const formatDescription = (data) => {
    return Object.entries(data).map(([index, item]) => {
      const stone = stoneGallery.find((stone) => stone.id === item.stone);
      return `Пункт ${parseInt(index) + 1}:
      - Розмірність: ${item.measure || 'Не вказано'}
      - Ширина: ${item.width || 'Не вказано'}
      - Довжина: ${item.length || 'Не вказано'}
      - Висота: ${item.height || 'Не вказано'}
      - Камінь: ${stone?.title || 'Не вказано'}
      - Розмірність кількості: ${item.quantity_measure || 'Не вказано'}
      - Кількість: ${item.quantity || 'Не вказано'}
      - Номер телефону: ${item.phoneNumber || 'Не вказано'}\n\n`;
    }).join('');
  };

  const handleSendEmail = () => {
    if (localStorage.getItem("cart") === null || orderedItems.length === 0) {
      alert(t('shoppingCart.emptyCart'));
      return;
    }
    if (Object.keys(formData).length === 0) {
      alert(t('shoppingCart.orderError'));
      return;
    }
    for (const key in formData) {
      console.log(formData[key], key);
      const item = formData[key];
      if ((!item.measure) || (!item.width) || (!item.length) || (!item.height) || (!item.stone) || (!item.quantity_measure) || (!item.quantity) || (!item.phoneNumber)) {
        alert(t('shoppingCart.orderError'));
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
          alert(t('shoppingCart.orderSuccess'));
          console.log("OK", response.status, response.text);
        },
        (error) => {
          console.log("FAILED", error);
        }
      )
      .then(() => {
        // localStorage.removeItem("cart");
        window.location.reload();
      });
  };

  return (
    <div className="shopping-cart">
      <div className="cart-items">
        {orderedItems.map((item, index) => (
          <ShoppingCartElement
            key={index}
            index={index}
            imgUrl={item.imgUrl}
            title={item.title}
            handleRemove={handleRemove}
            collectData={collectData}
          />
        ))}
      </div>
      <button onClick={handleSendEmail} className="order-button">
        {t('shoppingCart.orderButton')}
      </button>
    </div>
  );
}

export default ShoppingCart;
