import React from "react";
import { useCart } from "../../contexts/CartContextProvider";
import { Button } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { styled } from "@mui/system";

const CartMain = () => {
  const { cart, getCart, deleteCartProduct } = useCart();

  React.useEffect(() => {
    getCart();
  }, []);

  const HoverableIcon = styled(RemoveCircleOutlineIcon)`
    transition: color 0.4s;
    &:hover {
      color: red;
    }
  `;

  return (
    <div
      className="cart-main"
      style={{ width: "65%", color: "rgb(255,255,255)" }}
    >
      {cart?.products.length > 0 ? (
        <h2 style={{ fontSize: "32px", fontWeight: "800", marginTop: "5%" }}>
          Корзина({cart?.products.length})
        </h2>
      ) : null}

      {cart?.products.map((row) => (
        <div
          className="cart-card"
          key={row.item.id}
          style={{
            width: "100%",
            border: "5px solid #cbcbcb",
            margin: "5% 0",
            borderRadius: "10px",
            display: "flex",
            padding: "3%",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="cart-card-img" style={{ width: "30%" }}>
            <img
              src={row.item.picture}
              alt={row.item.title}
              style={{
                width: "220px",
                height: "300px",
                border: "2px solid #cbcbcb",
              }}
            />
          </div>
          <div
            className="cart-card-descr"
            style={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              padding: "3% 5%",
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
              <span style={{ paddingBottom: "1%" }}>{row.item.title}</span>
              <hr
                style={{
                  border: "1.5px solid #eee",
                  margin: "5px 0",
                  width: "100%",
                }}
              />
            </div>
            <div className="card-descr-attributes" style={{ fontSize: "16px" }}>
              <p style={{ paddingTop: "1%" }}>
                <b>КАТЕГОРИЯ</b> {row.item.category}
              </p>
              <p style={{ paddingTop: "1%" }}>
                <b>ЖАНР</b> {row.item.genre}
              </p>
            </div>
            <div
              className="card-descr-price"
              style={{
                marginTop: "37%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {row.subPrice === 0 ? (
                <p
                  style={{
                    textAlign: "left",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  БЕСПЛАТНО
                </p>
              ) : (
                <p
                  style={{
                    textAlign: "left",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  ЦЕНА {row.subPrice}$
                </p>
              )}
              <button
                style={{
                  fontSize: "1rem",
                  fontWeight: "700",
                  border: "none",
                  backgroundColor: "transparent",
                  color: "rgb(255,255,255)",
                  cursor: "pointer",
                  "&:hover": { color: "red", transition: "0.5s" },
                }}
                onClick={() => deleteCartProduct(row.item.id)}
              >
                <HoverableIcon fontSize="large" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartMain;
