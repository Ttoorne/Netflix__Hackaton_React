import React, { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContextProvider";
import { useLibrary } from "../../contexts/LibraryContextProvider";
import { Link } from "react-router-dom";

const CartPay = () => {
  const { cart, getCart } = useCart();
  const { library, addLibraryProduct, getLibrary } = useLibrary();

  const [formFields, setFormFields] = useState({
    name: "",
    surname: "",
    email: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    agreementChecked: false,
  });

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isFormValid = () => {
    const {
      name,
      surname,
      email,
      cardNumber,
      expirationDate,
      cvv,
      agreementChecked,
    } = formFields;
    return (
      name !== "" &&
      surname !== "" &&
      email !== "" &&
      cardNumber !== "" &&
      expirationDate !== "" &&
      cvv !== "" &&
      agreementChecked
    );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      cartCleaner();
    } else {
      alert("Пожалуйста, заполните все поля формы.");
    }
  };

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
          name="name"
          placeholder="Имя"
          value={formFields.name}
          onChange={handleInputChange}
        />
        <input
          style={{ padding: "3%", margin: "2% 0" }}
          type="text"
          name="surname"
          placeholder="Фамилия"
          value={formFields.surname}
          onChange={handleInputChange}
        />
        <input
          style={{ padding: "3%", margin: "2% 0" }}
          type="email"
          name="email"
          placeholder="Email"
          value={formFields.email}
          onChange={handleInputChange}
        />
        <input
          style={{ padding: "3%", margin: "2% 0" }}
          type="number"
          name="cardNumber"
          placeholder="Номер карты"
          value={formFields.cardNumber}
          onChange={handleInputChange}
        />
        <input
          style={{ padding: "3%", margin: "2% 0" }}
          type="text"
          name="expirationDate"
          placeholder="Дата окончания:(MM/YY)"
          value={formFields.expirationDate}
          onChange={handleInputChange}
        />
        <input
          style={{ padding: "3%", margin: "2% 0" }}
          type="number"
          name="cvv"
          placeholder="CVV"
          value={formFields.cvv}
          onChange={handleInputChange}
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
            <input
              type="checkbox"
              id="agreementCheckbox"
              name="agreementChecked"
              checked={formFields.agreementChecked}
              onChange={handleInputChange}
            />
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
            onClick={handleSubmit}
            disabled={!isFormValid()}
            style={{
              cursor: "pointer",
              color: "rgb(255,255,255)",
              fontWeight: "700",
              border: "none",
              textAlign: "center",
              padding: "3%",
              width: "100%",
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
