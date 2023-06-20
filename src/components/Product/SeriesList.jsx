import React, { useEffect, useState } from "react";
import { Box, Grid, Pagination } from "@mui/material";
import { useProducts } from "../../contexts/ProductContextProvider";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const SeriesList = () => {
  const { getProducts, products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getProducts();
    setPage(1);
  }, [searchParams]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 9; // 3 cards per row and 3 rows
  const count = Math.ceil(products.length / itemsPerPage);

  const handleChange = (e, p) => {
    setPage(p);
  };

  function currentData() {
    const begin = (page - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    return products.slice(begin, end);
  }

  const seriesProducts = products.filter((item) => item.category === "Series");

  return (
    <Grid item md={9}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {seriesProducts.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            sx={{ marginBottom: "20px" }}
          />
        ))}
      </Box>
      {/* <Pagination count={count} page={page} onChange={handleChange} /> */}
    </Grid>
  );
};

export default SeriesList;
