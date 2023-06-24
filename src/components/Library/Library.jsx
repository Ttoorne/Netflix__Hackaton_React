import React, { useEffect } from "react";
import { useLibrary } from "../../contexts/LibraryContextProvider";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { styled } from "@mui/system";

const Library = () => {
  let { library, deleteLibraryProduct, getLibrary } = useLibrary();

  useEffect(() => {
    getLibrary();
  }, []);

  const HoverableIcon = styled(RemoveCircleOutlineIcon)`
    transition: color 0.4s;
    &:hover {
      color: red;
    }
  `;

  if (library.products.length === 0) {
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
            Ваша библиотека пуста!
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage:
          "url('https://assets.nflxext.com/ffe/siteui/vlv3/39f3c979-c105-4948-9c51-611eedf3a6fd/cbcb1617-1a2b-46ce-96ef-768e2a9c591f/KG-ru-20230612-popsignuptwoweeks-perspective_alpha_website_medium.jpg')",
        paddingBottom: "5%",
      }}
    >
      <div
        className="library-main"
        style={{ width: "65%", color: "rgb(255,255,255)", margin: "auto" }}
      >
        {library?.products.length > 0 ? (
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "800",
              paddingTop: "5%",
              margin: "auto",
              width: "70%",
            }}
          >
            Библиотека({library?.products.length})
          </h2>
        ) : null}
        {library?.products.map((row) => (
          <div
            className="library-card"
            key={row.id}
            style={{
              width: "70%",
              border: "5px solid #cbcbcb",
              margin: "5% auto",
              borderRadius: "10px",
              display: "flex",
              padding: "3%",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="library-card-img" style={{ width: "30%" }}>
              <img
                src={row.picture}
                alt={row.title}
                style={{
                  width: "220px",
                  height: "300px",
                  border: "2px solid #cbcbcb",
                }}
              />
            </div>
            <div
              className="library-card-descr"
              style={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
                padding: "2% 1% 2% 15%",
              }}
            >
              <div
                className="library-descr-title"
                style={{
                  width: "100%",
                  fontSize: "1.3rem",
                  fontWeight: "900",
                  lineHeight: "1",
                }}
              >
                <span style={{ paddingBottom: "1%" }}>{row.title}</span>
                <hr
                  style={{
                    border: "1.5px solid #eee",
                    margin: "5px 0",
                    width: "100%",
                  }}
                />
              </div>
              <div
                className="library-descr-attributes"
                style={{ fontSize: "16px" }}
              >
                <p style={{ paddingTop: "1%" }}>
                  <b>КАТЕГОРИЯ</b> {row.category}
                </p>
                <p style={{ paddingTop: "1%" }}>
                  <b>ЖАНР</b> {row.genre}
                </p>
              </div>
              <div
                className="library-descr-price"
                style={{
                  marginTop: "55%",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
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
                  onClick={() => deleteLibraryProduct(row?.id)}
                >
                  <HoverableIcon fontSize="large" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
