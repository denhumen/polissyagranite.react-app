import React from "react";
import { useLocation } from "react-router-dom";
import ShoppingCart from "../components/ShoppingCart";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ShoppingCartPage = (isAdmin) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const title = params.get("title");
  const imgUrl = params.get("imgUrl");

  return (
    <div>
      <Header isAdmin={isAdmin} />
      <ShoppingCart title={title} imgUrl={imgUrl} />
      <Footer />
    </div>
  );
};

export default ShoppingCartPage;
