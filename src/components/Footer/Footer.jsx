import React from "react";

const Footer = () => {
  return (
    <div
      className="footer"
      style={{
        bottom: "0",
        backgroundColor: "black",
        color: "#cbcbcb",
        fontFamily:
          "Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif",
        fontSize: "16px",
        fontWeight: 400,

        borderTop: "3px solid rgba(35,35,35,1)",
      }}
    >
      <div
        className="footer-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          padding: "3% 0",
          width: "85%",
          margin: "auto",
        }}
      >
        <div
          className="footer-left"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ul style={{ listStyle: "none", lineHeight: "2" }}>
            <li>
              <a
                href="https://help.netflix.com/ru/contactus"
                style={{
                  textDecoration: "none",
                  color: "#cbcbcb",
                  fontFamily:
                    "Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif",
                  fontWeight: "500",
                }}
              >
                Есть вопросы? Свяжитесь с нами
              </a>
              .
            </li>
            <li>
              <a
                href="https://help.netflix.com/ru/node/412"
                style={{
                  textDecoration: "none",
                  color: "#cbcbcb",
                  fontFamily:
                    "Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif",
                  fontWeight: "500",
                }}
              >
                Распространенные вопросы
              </a>
            </li>
            <li>
              <a
                href="https://media.netflix.com/en/"
                style={{
                  textDecoration: "none",
                  color: "#cbcbcb",
                  fontFamily:
                    "Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif",
                  fontWeight: "500",
                }}
              >
                Медиацентр
              </a>
            </li>
            <li>
              <a
                href="https://devices.netflix.com/en/"
                style={{
                  textDecoration: "none",
                  color: "#cbcbcb",
                  fontFamily:
                    "Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif",
                  fontWeight: "500",
                }}
              >
                Способы просмотра
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-middle">
          <ul style={{ listStyle: "none", lineHeight: "2" }}>
            <li>
              <a
                href="https://help.netflix.com/ru/"
                style={{
                  textDecoration: "none",
                  color: "#cbcbcb",
                  fontFamily:
                    "Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif",
                  fontWeight: "500",
                }}
              >
                Центр поддержки
              </a>
            </li>
            <li>
              <a
                href="https://ir.netflix.net/ir-overview/profile/default.aspx"
                style={{
                  textDecoration: "none",
                  color: "#cbcbcb",
                  fontFamily:
                    "Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif",
                  fontWeight: "500",
                }}
              >
                Для инвесторов
              </a>
            </li>
            <li>
              <a
                href="https://help.netflix.com/legal/termsofuse"
                style={{
                  textDecoration: "none",
                  color: "#cbcbcb",
                  fontFamily:
                    "Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif",
                  fontWeight: "500",
                }}
              >
                Правила использования
              </a>
            </li>
            <li>
              <a
                href="https://help.netflix.com/legal/privacy"
                style={{
                  textDecoration: "none",
                  color: "#cbcbcb",
                  fontFamily:
                    "Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif",
                  fontWeight: "500",
                }}
              >
                Конфиденциальность
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-right">
          <ul style={{ listStyle: "none", lineHeight: "2" }}>
            <li>
              <a
                href="https://www.facebook.com/"
                style={{
                  textDecoration: "none",
                  color: "#cbcbcb",
                  fontFamily:
                    "Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif",
                  fontWeight: "500",
                }}
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com/"
                style={{
                  textDecoration: "none",
                  color: "#cbcbcb",
                  fontFamily:
                    "Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif",
                  fontWeight: "500",
                }}
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                style={{
                  textDecoration: "none",
                  color: "#cbcbcb",
                  fontFamily:
                    "Netflix Sans,Helvetica Neue,Segoe UI,Roboto,Ubuntu,sans-serif",
                  fontWeight: "500",
                }}
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <span
          style={{
            textAlign: "center",
            width: "90%",
            margin: "auto",
            marginTop: "50px",
          }}
        >
          © 2023 "Netflix" Смотрите лучшие фильмы онлайн. Все права защищены,
          копирование запрещено.
        </span>
      </div>
    </div>
  );
};

export default Footer;
