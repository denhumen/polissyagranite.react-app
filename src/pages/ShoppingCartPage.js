import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

import {ShoppingCart} from "../components/ShoppingCart";
// import "../assets/css/ShoppingCartPage.css";



function ShoppingCartPage(props) {

  const [cart, setCart] = useState([]);
  console.log(location);

  return (
    <div>
      <h2>Cart</h2>
      <ShoppingCart item={props.location.state.slide} />
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default ShoppingCartPage;