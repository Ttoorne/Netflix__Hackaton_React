import { Box, Grid, Pagination, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useProducts } from "../../contexts/ProductContextProvider";
import GenreSelect from "./GenreSelect";

const ProductList = () => {
  const { getProducts, products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    getProducts();
    setPage(1);
  }, [searchParams]);

  // Handle genre change
  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const filteredProducts = products.filter(
    (item) => selectedGenre === "" || item.genre === selectedGenre
  );

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  const count = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const currentData = () => {
    const begin = (page - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return filteredProducts.slice(begin, end);
  };
  // Pagination

  return (
    <Grid item md={9}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
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
          Каталог
        </Typography>
        <GenreSelect
          product={{ genre: selectedGenre }}
          setProduct={(product) => setSelectedGenre(product.genre)}
        />
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          width: "90%",
          margin: "auto",
        }}
      >
        {currentData().map((item) => (
          <ProductCard key={item.id} item={item} sx={{ marginBottom: "5%" }} />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "10%",
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

export default ProductList;
