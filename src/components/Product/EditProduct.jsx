import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContextProvider";
import CategorySelect from "./CategorySelect";
import GenreSelect from "./GenreSelect";

const EditProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    picture: "",
    description: "",
    price: 0,
    trailer: "",
    category: "",
    genre: "",
  });

  const { saveEditedProduct, getProductDetails, productDetails } =
    useProducts();

  const { id } = useParams();

  useEffect(() => {
    getProductDetails(id);
  }, []);

  useEffect(() => {
    if (productDetails) {
      setProduct(productDetails);
    }
  }, [productDetails]);

  const handleInp = (e) => {
    if (e.target.name === "price") {
      let obj = {
        ...product,
        [e.target.name]: Number(e.target.value),
      };
      setProduct(obj);
    } else {
      let obj = {
        ...product,
        [e.target.name]: e.target.value,
      };
      setProduct(obj);
    }
  };

  return (
    <Box
      sx={{
        paddingBottom: "3%",
      }}
    >
      <Typography
        sx={{
          paddingTop: "2%",
          color: "white",
          WebkitTextStroke: "3px black",
          fontWeight: "900",
          fontSize: "44px",
        }}
        variant="h4"
        align="center"
      >
        Редактировать
      </Typography>
      <Box
        sx={{
          width: "60vw",
          margin: "10px auto",
          padding: "5% 5%",
          boxShadow: "0px 0px 21px 15px rgb(229, 9, 20)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            marginBottom: "20px",
            boxShadow: "0px 0px 7px 9px rgba(255, 67, 0, 0.2) inset",
            textAlign: "center",
            fontSize: "1rem",
          }}
          fullWidth
          onChange={handleInp}
          name="title"
          label="Название"
          variant="outlined"
          value={product.title}
        />
        <TextField
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            marginBottom: "20px",
            boxShadow: "0px 0px 7px 9px rgba(255, 67, 0, 0.2) inset",
          }}
          fullWidth
          onChange={handleInp}
          name="description"
          label="Описание"
          variant="outlined"
          value={product.description}
        />
        <TextField
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            marginBottom: "20px",
            boxShadow: "0px 0px 7px 9px rgba(255, 67, 0, 0.2) inset",
          }}
          fullWidth
          onChange={handleInp}
          name="picture"
          label="Изображение"
          variant="outlined"
          value={product.picture}
        />
        <TextField
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            marginBottom: "20px",
            boxShadow: "0px 0px 7px 9px rgba(255, 67, 0, 0.2) inset",
          }}
          fullWidth
          onChange={handleInp}
          name="price"
          label="Цена"
          variant="outlined"
          value={product.price}
        />
        <TextField
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            marginBottom: "20px",
            boxShadow: "0px 0px 7px 9px rgba(255, 67, 0, 0.2) inset",
          }}
          fullWidth
          onChange={handleInp}
          name="trailer"
          label="Ссылка на трейлер"
          variant="outlined"
          value={product.trailer}
        />
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          <CategorySelect product={product} setProduct={setProduct} />
        </Box>
        <Box
          sx={{
            borderRadius: "5px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "center",
            padding: "2% 0",
          }}
        >
          <GenreSelect product={product} setProduct={setProduct} />
        </Box>
        <Box sx={{ backgroundColor: "orange", borderRadius: "5px" }}>
          <Button
            sx={{
              backgroundColor: "white",
              borderRadius: "5px",
              color: "black",
              fontSize: "22px",
              fontWeight: "900",
              fontFamily: "segoe ui",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            onClick={() => saveEditedProduct(product)}
            fullWidth
            variant="outlined"
            size="large"
            className="admin__button"
          >
            Сохранить
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProduct;
