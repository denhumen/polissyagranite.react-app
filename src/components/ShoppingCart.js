import { useState } from "react";
import "../assets/css/shopping-cart.css";
import DropDownCartMenu from "./DropDownCartMenu";

function ShoppingCart(item) {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div className="cart-item">
        <img src={item.imgUrl} alt="cart item" />
        <h2>{item.title}</h2>
        <button className="btn-expand" onClick={handleExpand}>+</button>
      </div>
      {
        expanded && (
            <DropDownCartMenu />
        )
      }
    </div>
  );
}

export default ShoppingCart;
