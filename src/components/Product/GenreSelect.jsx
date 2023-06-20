import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function GenreSelect({ product, setProduct }) {
  function handleChange(e) {
    setProduct({ ...product, genre: e.target.value });
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Жанр</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        defaultValue=""
        label="Жанр"
        value={product.genre}
        onChange={handleChange}
      >
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
