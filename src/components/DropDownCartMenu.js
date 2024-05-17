import React, { useState, useEffect, useRef } from "react";
import "../assets/css/shopping-cart.css";
import { get_stone_gallery } from "../firebase-communication/firebase-database";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const DropDownCartMenu = ({ collectData }) => {
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
      <h3>Розміри</h3>
      <div className="form-row">
        <label>Розмірність</label>
        <select
          name="measure"
          value={formValues.measure}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="cm">cm</option>
          <option value="mm">mm</option>
        </select>
      </div>
      <div className="form-row">
        <label>Ширина</label>
        <input
          type="text"
          name="width"
          value={formValues.width}
          onChange={handleChange}
          placeholder="дробове число"
        />
      </div>
      <div className="form-row">
        <label>Довжина</label>
        <input
          type="text"
          name="length"
          value={formValues.length}
          onChange={handleChange}
          placeholder="дробове число"
        />
      </div>
      <div className="form-row">
        <label>Висота</label>
        <input
          type="text"
          name="height"
          value={formValues.height}
          onChange={handleChange}
          placeholder="дробове число"
        />
      </div>
      <h3>Камінь</h3>
      <div className="form-row">
        <label>Камінь</label>
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
            ) : ("Select a stone")}
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
      <h3>Кількість</h3>
      <div className="form-row">
        <label>Розмірність</label>
        <select
          name="quantity_measure"
          value={formValues.quantity_measure}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="m2">м²</option>
          <option value="pc">шт</option>
        </select>
      </div>
      <div className="form-row">
        <label>Кількість</label>
        <input
          type="number"
          name="quantity"
          value={formValues.quantity}
          onChange={handleChange}
          placeholder="ціле число"
        />
      </div>
      <h3>Контактний номер телефону</h3>
      <div className="form-row">
        <label>Телефон</label>
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
