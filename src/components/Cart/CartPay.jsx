import React, { useEffect } from "react";
import { useCart } from "../../contexts/CartContextProvider";
import { useLibrary } from "../../contexts/LibraryContextProvider";

const CartPay = () => {
  const { cart, getCart } = useCart();
  const { addLibraryProduct } = useLibrary();

  const cartCleaner = () => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    const libraryData = JSON.parse(localStorage.getItem("library"));

    if (libraryData && cartData && cartData.products.length > 0) {
      cartData.products.forEach((product) => {
        addLibraryProduct(product.item);
      });
    }

    localStorage.removeItem("cart");
    getCart();
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (!cart || cart.totalPrice === 0) {
    return (
      <div
        style={{
          color: "rgb(255,255,255)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <h1 style={{ position: "absolute", left: "35%", fontSize: "44px" }}>
          Ваша корзина пуста!
        </h1>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "82%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "rgb(255, 255, 255)",
        padding: "20px",
        width: "25%",
      }}
    >
      <div
        className="cart-pay"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h5 style={{ textAlign: "center" }}>Форма оплаты</h5>
        <div className="cart-pay-images"></div>
        <input type="text" placeholder="Имя" />
        <input type="text" placeholder="Фамилия" />
        <input type="text" placeholder="Email" />
        <input type="text" placeholder="Номер карты" />
        <input type="text" placeholder="Дата окончания:(MM/YY)" />
        <input type="text" placeholder="CVV" />
        <div className="cart-pay-check">
          <label htmlFor="agreementCheckbox">Прочитано и согласен</label>
          <input type="checkbox" id="agreementCheckbox" />
        </div>
        <div className="cart-pay-bottom">
          Итого к оплате: {cart.totalPrice}$
        </div>
        <button onClick={cartCleaner} style={{ cursor: "pointer" }}>
          Подтвердить оплату
        </button>
      </div>
    </div>
  );
};

export default CartPay;
