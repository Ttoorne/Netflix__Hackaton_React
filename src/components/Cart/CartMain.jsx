import React from "react";
import { useCart } from "../../contexts/CartContextProvider";
import { Button } from "@mui/material";

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
    <div
      className="cart-main"
      style={{ width: "65%", color: "rgb(255,255,255)" }}
    >
      {cart?.products.map((row) => (
        <div
          className="cart-card"
          key={row.item.id}
          style={{
            width: "100%",
            border: "2px solid #cbcbcb",
            margin: "5% 0",
            borderRadius: "10px",
            display: "flex",
            padding: "3%",
          }}
        >
          <div className="cart-card-img" style={{ width: "30%" }}>
            <img
              src={row.item.picture}
              alt={row.item.title}
              style={{ width: "220px", height: "300px" }}
            />
          </div>
          <div
            className="cart-card-descr"
            style={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              padding: "2%",
            }}
          >
            <div
              className="card-descr-title"
              style={{
                width: "100%",
                fontSize: "1.3rem",
                fontWeight: "900",
                lineHeight: "1",
              }}
            >
              <span>{row.item.title}</span>
              <hr
                style={{
                  border: "1.5px solid #eee",
                  margin: "5px 0",
                  width: "100%",
                }}
              />
            </div>
            <div className="card-descr-attributes" style={{ fontSize: "16px" }}>
              <p>
                <b>КАТЕГОРИЯ</b> {row.item.category}
              </p>
              <p>
                <b>ЖАНР</b> {row.item.genre}
              </p>
            </div>
            <div
              className="card-descr-price"
              style={{
                marginTop: "35%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                style={{
                  fontSize: "1rem",
                  fontWeight: "800",
                  border: "none",
                  backgroundColor: "black",
                  color: "rgb(255,255,255)",
                  cursor: "pointer",
                  "&hover": { color: "red", transition: "0.5s" },
                }}
                onClick={() => deleteCartProduct(row.item.id)}
              >
                УДАЛИТЬ
              </button>
              {row.subPrice === 0 ? (
                <p
                  style={{
                    textAlign: "right",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  БЕСПЛАТНО
                </p>
              ) : (
                <p
                  style={{
                    textAlign: "right",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  Цена : {row.subPrice}$
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
      <Button sx={{ marginTop: "10%" }} onClick={cartCleaner}>
        BUY NOW FOR {cart?.totalPrice} $
      </Button>
    </div>
  );
};

export default CartMain;
