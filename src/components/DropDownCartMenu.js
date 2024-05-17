import React, { useState, useEffect, useRef } from "react";
import "../assets/css/shopping_cart.css";
import { get_stone_gallery } from "../firebase-communication/firebase-database";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useTranslation } from 'react-i18next';

const DropDownCartMenu = ({ collectData }) => {
  const [t, i18n] = useTranslation("global");
  const [formValues, setFormValues] = useState({
    measure: "",
    width: "",
    length: "",
    height: "",
    stone: "",
    quantity_measure: "",
    quantity: "",
    phoneNumber: "",
  });

  const [stoneGallery, setStoneGallery] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchStoneGallery = async () => {
      try {
        const stones = await get_stone_gallery();
        setStoneGallery(stones);
      } catch (error) {
        console.error("Error fetching stone gallery:", error);
      }
    };

    fetchStoneGallery();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    collectData({ ...formValues, [name]: value });
    e.stopPropagation();
  };

  const handlePhoneChange = (value) => {
    setFormValues({ ...formValues, phoneNumber: value });
    collectData({ ...formValues, phoneNumber: value });
  };

  const handleDropdownToggle = (e) => {
    setIsDropdownOpen(!isDropdownOpen);
    e.stopPropagation();
  };

  const handleStoneSelect = (stone) => {
    setFormValues({ ...formValues, stone: stone.id });
    collectData({ ...formValues, stone: stone.id });
    setIsDropdownOpen(false);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <form onSubmit={handleSubmit} className="form-shopping-cart">
      <h3>{t('shoppingCart.dimensions')}</h3>
      <div className="form-row">
        <label>{t('shoppingCart.measure')}</label>
        <select
          name="measure"
          value={formValues.measure}
          onChange={handleChange}
        >
          <option value="">{t('shoppingCart.select')}</option>
          <option value="cm">cm</option>
          <option value="mm">mm</option>
        </select>
      </div>
      <div className="form-row">
        <label>{t('shoppingCart.width')}</label>
        <input
          type="text"
          name="width"
          value={formValues.width}
          onChange={handleChange}
          placeholder={t('shoppingCart.placeholder_fraction')}
        />
      </div>
      <div className="form-row">
        <label>{t('shoppingCart.length')}</label>
        <input
          type="text"
          name="length"
          value={formValues.length}
          onChange={handleChange}
          placeholder={t('shoppingCart.placeholder_fraction')}
        />
      </div>
      <div className="form-row">
        <label>{t('shoppingCart.height')}</label>
        <input
          type="text"
          name="height"
          value={formValues.height}
          onChange={handleChange}
          placeholder={t('shoppingCart.placeholder_fraction')}
        />
      </div>
      <h3>{t('shoppingCart.stone')}</h3>
      <div className="form-row">
        <label>{t('shoppingCart.stone')}</label>
        <div className="custom-dropdown" ref={dropdownRef}>
          <div
            className="custom-dropdown-header"
            onClick={handleDropdownToggle}
          >
            {formValues.stone ? (
              <div className="selected-stone">
                <img
                  src={
                    stoneGallery.find((stone) => stone.id === formValues.stone)
                      ?.img_url
                  }
                  alt="Selected Stone"
                />
                <span>
                  {
                    stoneGallery.find((stone) => stone.id === formValues.stone)
                      ?.title
                  }
                </span>
              </div>
            ) : (
              t('shoppingCart.select_stone')
            )}
          </div>
          {isDropdownOpen && (
            <ul className="custom-dropdown-menu">
              {stoneGallery.map((stone) => (
                <li
                  key={stone.id}
                  className="custom-dropdown-item"
                  onClick={(e) => {
                    handleStoneSelect(stone);
                    e.stopPropagation();
                  }}
                >
                  <img src={stone.img_url} alt={stone.title} />
                  <span>{stone.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <h3>{t('shoppingCart.quantity')}</h3>
      <div className="form-row">
        <label>{t('shoppingCart.quantity_measure')}</label>
        <select
          name="quantity_measure"
          value={formValues.quantity_measure}
          onChange={handleChange}
        >
          <option value="">{t('shoppingCart.select')}</option>
          <option value="m2">{t('shoppingCart.m2')}</option>
          <option value="pc">{t('shoppingCart.pc')}</option>
        </select>
      </div>
      <div className="form-row">
        <label>{t('shoppingCart.quantity')}</label>
        <input
          type="number"
          name="quantity"
          value={formValues.quantity}
          onChange={handleChange}
          placeholder={t('shoppingCart.placeholder_fraction')}
        />
      </div>
      <h3>{t('shoppingCart.phone')}</h3>
      <div className="form-row">
        <label>{t('shoppingCart.phone')}</label>
        <PhoneInput
          country={"us"}
          value={formValues.phoneNumber}
          onChange={handlePhoneChange}
          inputStyle={{ width: "100%" }}
        />
      </div>
    </form>
  );
};

export default DropDownCartMenu;
