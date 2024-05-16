import React, { useState, useEffect, useRef } from "react";
import "../assets/css/shopping-cart.css";
import { get_stone_gallery } from "../firebase-communication/firebase-database";

const DropDownCartMenu = (expanded) => {
  const [formValues, setFormValues] = useState({
    metrics: "",
    width: "",
    length: "",
    height: "",
    stone: "",
    quantity_measure: "",
    quantity: "",
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
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleStoneSelect = (stone) => {
    setFormValues({ ...formValues, stone: stone.id });
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
  };

  return (
    <form onSubmit={handleSubmit}>
        <h3>Розміри</h3>
      <div className="form-row">
        <label>Розмірність</label>
        <select
          name="metrics"
          value={formValues.metrics}
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
            ) : (
              "Select a stone"
            )}
          </div>
          {isDropdownOpen && (
            <ul className="custom-dropdown-menu">
              {stoneGallery.map((stone) => (
                <li
                  key={stone.id}
                  className="custom-dropdown-item"
                  onClick={() => handleStoneSelect(stone)}
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default DropDownCartMenu;
