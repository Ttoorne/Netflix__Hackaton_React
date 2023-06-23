import React, { useEffect, useState } from 'react';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import { useProducts } from '../../contexts/ProductContextProvider';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import GenreSelect from './GenreSelect';

const FilmsList = () => {
  const { getProducts, products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 9; // 3 cards per row and 3 rows

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  const filmsProducts = products.filter(
    (item) =>
      item.category === 'Films' &&
      (selectedGenre === '' || item.genre === selectedGenre)
  );

  const count = Math.ceil(filmsProducts.length / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const currentData = filmsProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Grid item md={9}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '90%',
          margin: '5% auto 3%',
        }}>
        <Typography
          variant="h1"
          sx={{
            color: 'rgb(255, 255, 255)',
            fontSize: '3rem',
            fontWeight: '400',
            paddingRight: '3%',
          }}>
          Фильмы
        </Typography>
        <GenreSelect
          product={{ genre: selectedGenre }}
          setProduct={(product) => setSelectedGenre(product.genre)}
        />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          width: '80%',
          margin: 'auto',
        }}>
        {currentData.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            sx={{ marginBottom: '20px' }}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '10%',
          backgroundColor: 'black',
          color: 'white',
          '& .MuiPagination-root': {
            '& .MuiPaginationItem-root': {
              color: 'white',
              fontSize: '1rem',
            },
            '& .Mui-selected': {
              backgroundColor: 'white',
              color: 'black',
              fontWeight: 'bold',
            },
            '& .MuiPaginationItem-root:hover': {
              backgroundColor: 'black',
              color: '#fff',
              border: '1px solid #616161',
            },
          },
        }}>
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

export default FilmsList;
