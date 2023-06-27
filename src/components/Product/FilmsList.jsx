import React, { useEffect, useState } from 'react';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import { useProducts } from '../../contexts/ProductContextProvider';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import GenreSelect from './GenreSelect';
import './Product.css';

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
    <Grid
      className="boxx"
      item
      md={9}
      sx={{
        backgroundImage:
          "url('https://wpassets.brainstation.io/app/uploads/2017/04/13100509/Netflix-Background.jpg')",
        padding: '1% 0 0',
      }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '90%',
          margin: '5% auto 3%',
        }}>
        <Typography
          variant="h1"
          sx={{
            color: 'rgb(255, 255, 255)',
            fontSize: '3em',
            fontWeight: '400',
            paddingRight: '3%',
          }}>
          Фильмы
        </Typography>
        <Box sx={{ width: '35%' }}>
          <GenreSelect
            product={{ genre: selectedGenre }}
            setProduct={(product) => setSelectedGenre(product.genre)}
          />
        </Box>
      </Box>

      <Box
        className="grid"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          width: '90%',
          margin: 'auto',
        }}>
        {currentData.map((item) => (
          <ProductCard key={item.id} item={item} sx={{ marginBottom: '5%' }} />
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '3% 0 5%',
          backgroundColor: 'black',
          color: 'white',
          '& .MuiPagination-root': {
            '& .MuiPaginationItem-root': {
              color: 'white',
              fontSize: '1em',
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
          sx={{ marginBottom: '-3%' }}
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
