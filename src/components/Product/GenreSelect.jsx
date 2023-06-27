import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import './Product.css';

export default function GenreSelect({ product, setProduct }) {
  function handleChange(e) {
    setProduct({ ...product, genre: e.target.value });
  }

  return (
    <FormControl fullWidth>
      <Select
        className="boxx"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={product.genre}
        onChange={handleChange}
        input={<OutlinedInput />}
        displayEmpty
        variant="outlined"
        size="medium"
        sx={{
          fontSize: '1em',
          backgroundColor: '#fff',
          borderRadius: '4px',
          height: '50px',
          width: '80%',
        }}>
        <MenuItem value="">Все жанры</MenuItem>
        <MenuItem value="Comedy">Комедия</MenuItem>
        <MenuItem value="Action">Боевик</MenuItem>
        <MenuItem value="Horror">Ужасы</MenuItem>
        <MenuItem value="Drama">Драма</MenuItem>
        <MenuItem value="Melodrama">Мелодрама</MenuItem>
        <MenuItem value="Thriller">Триллер</MenuItem>
      </Select>
    </FormControl>
  );
}
