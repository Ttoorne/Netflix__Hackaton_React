import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function CategorySelect({ product, setProduct }) {
  function handleChange(e) {
    setProduct({ ...product, category: e.target.value });
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Категория</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        defaultValue=""
        label="Category"
        value={product.category}
        onChange={handleChange}
      >
        <MenuItem value="Films">Фильмы</MenuItem>
        <MenuItem value="Series">Сериалы</MenuItem>
        <MenuItem value="Cartoons">Мультфильмы</MenuItem>
      </Select>
    </FormControl>
  );
}
