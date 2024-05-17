import React from "react";
import ShoppingCart from "../components/ShoppingCart";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ShoppingCartPage = (isAdmin = false) => {
  return (
    <div>
      <Header isAdmin={isAdmin} />
      <ShoppingCart />
      <Footer />
    </div>
  );
};

export default ShoppingCartPage;
