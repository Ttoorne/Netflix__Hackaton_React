import React from "react";

const NotFoundPage = () => {
  return (
    <div
      style={{
        color: "white",
        margin: "10% 0",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "900" }}>
        Ничего не найдено!
      </h1>
      <p style={{ fontSize: "1rem" }}>Перепроверьте все, пожалуйста</p>
    </div>
  );
};

export default NotFoundPage;
