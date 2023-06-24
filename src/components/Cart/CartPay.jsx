import React, { useEffect } from "react";
import { useCart } from "../../contexts/CartContextProvider";
import { useLibrary } from "../../contexts/LibraryContextProvider";
import { Link } from "react-router-dom";

const CartPay = () => {
  const { cart, getCart } = useCart();
  const { library, addLibraryProduct, getLibrary } = useLibrary();

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

  useEffect(() => {
    getLibrary();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "82%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "beige",
        color: "rgb(255, 255, 255)",
        padding: "20px",
        width: "25%",
        borderRadius: "15px",
      }}
    >
      <div
        className="cart-pay"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <h2 style={{ textAlign: "center", color: "black", marginBottom: "3%" }}>
          Форма оплаты
        </h2>
        <div className="cart-pay-images"></div>
        <input
          style={{ padding: "3%", margin: "2% 0" }}
          type="text"
          placeholder="Имя"
        />
        <input
          style={{ padding: "3%", margin: "2% 0" }}
          type="text"
          placeholder="Фамилия"
        />
        <input
          style={{ padding: "3%", margin: "2% 0" }}
          type="email"
          placeholder="Email"
        />
        <input
          style={{ padding: "3%", margin: "2% 0" }}
          type="text"
          placeholder="Номер карты"
        />
        <input
          style={{ padding: "3%", margin: "2% 0" }}
          type="text"
          placeholder="Дата окончания:(MM/YY)"
        />
        <input
          style={{ padding: "3%", margin: "2% 0 5%" }}
          type="text"
          placeholder="CVV"
        />
        <a
          href="https://help.netflix.com/legal/termsofuse"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Условия пользования и соглашения
        </a>
        <div
          className="cart-pay-check"
          style={{ color: "black", margin: "2% 0 5%" }}
        >
          <label htmlFor="agreementCheckbox" color="black">
            Прочитано и согласен{" "}
            <input type="checkbox" id="agreementCheckbox" />
          </label>
        </div>
        <div
          className="cart-pay-bottom"
          style={{
            color: "black",
            textAlign: "center",
            padding: "3%",
            margin: "2% 0",
            fontSize: "20px",
            fontWeight: "700",
            backgroundColor: "#dad9d9",
          }}
        >
          Итого к оплате:{" "}
          <span style={{ color: "#0071eb" }}>{cart.totalPrice}$</span>
        </div>
        <Link to="/library">
          <button
            onClick={cartCleaner}
            style={{
              cursor: "pointer",
              color: "rgb(255,255,255)",
              fontWeight: "700",
              border: "none",
              textAlign: "center",
              padding: "3%",
              margin: "2% 0",
              borderRadius: "5px",
              fontSize: "20px",
              backgroundColor: "rgb(229, 9, 20)",
            }}
          >
            Подтвердить оплату
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartPay;
