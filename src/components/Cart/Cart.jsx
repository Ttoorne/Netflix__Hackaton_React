import React from "react";
import CartMain from "./CartMain";
import CartPay from "./CartPay";

const Cart = () => {
  return (
    <div style={{ width: "90%", margin: "auto", display: "flex" }}>
      <CartMain />
      <CartPay />
    </div>
  );
};

export default Cart;
