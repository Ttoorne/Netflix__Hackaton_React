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
import { useCart } from "../../contexts/CartContextProvider";
import { useAuth } from "../../contexts/AuthContextProvider";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ProductCard({ item }) {
  const { deleteProduct } = useProducts();
  const { addProductToCart, checkProductCart } = useCart();
  const navigate = useNavigate();
  const {
    user: { email },
  } = useAuth();

  return (
    <Card
      sx={{
        maxWidth: "360px",
        marginBottom: "15%",
        backgroundColor: "black",
        color: "white",
        boxShadow: "0px 0px 8px 3px rgba(255, 1, 0, 0.5) inset",
        borderRadius: "30px",
        padding: "15px",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <CardMedia
        sx={{
          height: 0,
          paddingTop: "100%",
          cursor: "pointer",
          maxWidth: "100%",
          borderRadius: "15px",
        }}
        image={item.picture}
        title="picture"
        onClick={() => navigate(`/details/${item.id}`)}
      />
      <CardContent>
        <Button
          gutterBottom
          variant="contained"
          color="error"
          component="div"
          onClick={() => navigate(`/details/${item.id}`)}
          sx={{
            textAlign: "center",
            fontSize: "1rem",
            fontWeight: "800",
            margin: "10px 0",
            width: "100%",
            height: "60px",
          }}
        >
          {item.title}
        </Button>
        <Typography
          gutterBottom
          variant="p"
          component="div"
          sx={{ fontSize: "90%", marginTop: "2%" }}
        >
          {item.description.slice(0, 200)}
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
            <Button
              startIcon={<DeleteIcon />}
              size="medium"
              color="error"
              variant="contained"
              onClick={() => deleteProduct(item.id)}
            >
              Удалить
            </Button>
            <Button
              startIcon={<EditIcon />}
              color="secondary"
              size="medium"
              variant="contained"
              onClick={() => navigate(`/edit/${item.id}`)}
            >
              Редактировать
            </Button>
          </>
        ) : null}
        {email !== ADMIN && email ? (
          <div
            style={{
              width: "95%",
              margin: "auto",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <button
              style={{
                color: "rgb(255,255,255)",
                fontSize: "17px",
                fontWeight: "600",
                padding: "0 5%",
                backgroundColor: "black",
                border: "1px solid rgba(35,35,35,1)",
                borderRadius: "10px 0px 0px 10px",
              }}
            >
              {item.price === 0 ? (
                <Typography variant="p">Бесплатно</Typography>
              ) : (
                <Typography variant="p" sx={{ position: "end" }}>
                  {item.price}$
                </Typography>
              )}
            </button>
            <Button
              sx={{
                color: "rgb(255,255,255)",
                fontSize: "17px",
                fontWeight: "600",
                padding: "0 1%",
                "&:hover": {
                  backgroundColor: checkProductCart(item.id)
                    ? "black"
                    : "rgba(35,35,35,1)",
                },
                border: "1px solid rgba(35,35,35,1)",
                borderRadius: "0px 10px 10px 0px",
              }}
            >
              <IconButton
                sx={{
                  color: checkProductCart(item.id)
                    ? "rgba(35,35,35,1)"
                    : "inherit",
                }}
                onClick={() => addProductToCart(item)}
              >
                <AddShoppingCartIcon />
              </IconButton>
            </Button>
          </div>
        ) : null}
      </CardActions>
    </Card>
  );
}
