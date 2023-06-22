import React from "react";
import { useCart } from "../../contexts/CartContextProvider";

const CartMain = () => {
  const { cart, getCart, changeProductCount, deleteCartProduct } = useCart();

  React.useEffect(() => {
    getCart();
  }, []);

  const cartCleaner = () => {
    localStorage.removeItem("cart");
    getCart();
  };

  const handleCountChange = (count, id) => {
    changeProductCount(count, id);
  };

  return (
    <div className="cart-main">
      {cart?.products.map((row) => (
        <div
          className="cart-card"
          key={row.item.id}
          style={{ width: "" }}
        ></div>
      ))}
    </div>
  );
};

export default CartMain;
