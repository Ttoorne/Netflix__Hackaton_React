import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function GenreSelect({ product, setProduct }) {
  function handleChange(e) {
    setProduct({ ...product, genre: e.target.value });
  }

  return (
    <FormControl fullWidth sx={{ marginTop: "20px" }}>
      <Select
        value={product.genre}
        onChange={handleChange}
        input={<OutlinedInput />}
        displayEmpty
        variant="outlined"
        size="small"
        sx={{
          backgroundColor: "#fff",
          borderRadius: "4px",
          width: "15%",
        }}
      >
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
