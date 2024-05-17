import React from "react";
import ShoppingCart from "../components/ShoppingCart";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const ShoppingCartPage = () => {
  const { user } = useAuth();
  const isAdmin = !!user;

  return (
    <div>
      <Header isAdmin={isAdmin} />
      <ShoppingCart />
      <Footer />
    </div>
  );
};

export default ShoppingCartPage;
