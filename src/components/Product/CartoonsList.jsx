import React, { useEffect, useState } from "react";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import { useProducts } from "../../contexts/ProductContextProvider";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import GenreSelect from "./GenreSelect";

const CartoonsList = () => {
  const { getProducts, products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 9; // 3 cards per row and 3 rows

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  const cartoonsProducts = products.filter(
    (item) =>
      item.category === "Cartoons" &&
      (selectedGenre === "" || item.genre === selectedGenre)
  );

  const count = Math.ceil(cartoonsProducts.length / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const currentData = cartoonsProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Grid
      item
      md={9}
      sx={{
        backgroundImage:
          "url('https://wpassets.brainstation.io/app/uploads/2017/04/13100509/Netflix-Background.jpg')",
        padding: "1% 0 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "90%",
          margin: "5% auto 3%",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "rgb(255, 255, 255)",
            fontSize: "3rem",
            fontWeight: "400",
            paddingRight: "3%",
          }}
        >
          Мультфильмы
        </Typography>
        <Box sx={{ width: "15%" }}>
          <GenreSelect
            product={{ genre: selectedGenre }}
            setProduct={(product) => setSelectedGenre(product.genre)}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          width: "90%",
          margin: "auto",
        }}
      >
        {currentData.map((item) => (
          <ProductCard key={item.id} item={item} sx={{ marginBottom: "5%" }} />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "3% 0 5%",
          backgroundColor: "black",
          color: "white",
          "& .MuiPagination-root": {
            "& .MuiPaginationItem-root": {
              color: "white",
              fontSize: "1rem",
            },
            "& .Mui-selected": {
              backgroundColor: "white",
              color: "black",
              fontWeight: "bold",
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "black",
              color: "#fff",
              border: "1px solid #616161",
            },
          },
        }}
      >
        <Pagination
          sx={{ marginBottom: "-3%" }}
          count={count}
          page={page}
          onChange={handleChange}
          showFirstButton
          showLastButton
        />
      </Box>
    </Grid>
  );
};

export default CartoonsList;
