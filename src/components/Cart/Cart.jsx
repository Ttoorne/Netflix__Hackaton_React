import React from "react";
import CartMain from "./CartMain";
import CartPay from "./CartPay";
import { useCart } from "../../contexts/CartContextProvider";

const Cart = () => {
  const { cart } = useCart();

  if (cart?.products.length === 0) {
    return (
      <div
        style={{
          color: "rgb(255,255,255)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          width: "100%",
          backgroundImage:
            "url('https://assets.nflxext.com/ffe/siteui/vlv3/39f3c979-c105-4948-9c51-611eedf3a6fd/cbcb1617-1a2b-46ce-96ef-768e2a9c591f/KG-ru-20230612-popsignuptwoweeks-perspective_alpha_website_medium.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div
          style={{
            border: "3px solid black",
            backgroundColor: "rgba(0, 0, 0, 0.7);",
            padding: "1%",
            borderRadius: "15px",
            backdropFilter: "blur(10px)",
          }}
        >
          <h1 style={{ fontSize: "32px", fontWeight: "800" }}>
            Ваша корзина пуста!
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "90%", margin: "auto", display: "flex" }}>
      <CartMain />
      <CartPay />
    </div>
  );
};

export default Cart;
