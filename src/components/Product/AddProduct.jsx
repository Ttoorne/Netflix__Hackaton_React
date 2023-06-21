import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useProducts } from "../../contexts/ProductContextProvider";
import CategorySelect from "./CategorySelect";
import GenreSelect from "./GenreSelect";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    picture: "",
    price: 0,
    category: "",
    genre: "",
  });

  const { addProduct } = useProducts();

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

  const handleAddProduct = () => {
    addProduct(product);
    setProduct({
      title: "",
      description: "",
      picture: "",
      price: 0,
      category: "",
      genre: "",
    });
  };

  return (
    <Box sx={{ paddingBottom: "3%", color: "rgb(255, 255, 255)" }}>
      <Typography
        sx={{
          padding: "5% 0 3%",
          fontWeight: "900",
          fontSize: "3rem",
        }}
        variant="h4"
        textAlign="center"
      >
        Добавить фильм
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
          value={product.title} // Установка значения из состояния
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
          value={product.description} // Установка значения из состояния
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
          value={product.picture} // Установка значения из состояния
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
          value={product.price} // Установка значения из состояния
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

        <Box>
          <Button
            sx={{
              backgroundColor: "red",
              borderRadius: "5px",
              color: "rgb(255,255,255)",
              fontSize: "22px",
              fontWeight: "900",
              fontFamily: "segoe ui",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            onClick={handleAddProduct}
            fullWidth
            variant="outlined"
            size="large"
            className="admin__button"
          >
            Добавить
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddProduct;
