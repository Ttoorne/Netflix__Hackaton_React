import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useProducts } from "../../contexts/ProductContextProvider";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { ADMIN } from "../../helpers/consts";
// import { useCart } from "../../contexts/CartContextProvider";
import { useAuth } from "../../contexts/AuthContextProvider";

export default function ProductCard({ item }) {
  const { deleteProduct } = useProducts();
  //   const { addProductToCart, checkProductCart } = useCart();
  const navigate = useNavigate();
  const {
    user: { email },
  } = useAuth();

  return (
    <Card sx={{ maxWidth: 345, marginBottom: "15%" }}>
      <CardMedia
        sx={{
          height: 0,
          paddingTop: "100%", // Set the paddingTop to 100% for full image display
          cursor: "pointer",
          maxWidth: "100%",
        }}
        image={item.picture}
        title="picture"
        onClick={() => navigate(`/details/${item.id}`)}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography gutterBottom variant="p" component="div">
          {item.description}
        </Typography>
      </CardContent>
      <div
        style={{
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          margin: "0 16px",
        }}
      />
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {email === ADMIN ? (
          <>
            <Button size="small" onClick={() => deleteProduct(item.id)}>
              Удалить
            </Button>
            <Button size="small" onClick={() => navigate(`/edit/${item.id}`)}>
              Редактировать
            </Button>
          </>
        ) : null}

        {/* {email === ADMIN ? (
          <>
        ) : (
          <IconButton
            sx={{
              color: checkProductCart(item.id) ? "primary" : "inherit",
            }}
            onClick={() => addProductToCart(item)}
          >
            <AddShoppingCartIcon />
          </IconButton>
        )} */}
      </CardActions>
    </Card>
  );
}
