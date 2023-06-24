import React, { useEffect } from "react";
import { useProducts } from "../../contexts/ProductContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "../../contexts/CartContextProvider";

const ProductDetails = () => {
  const { getProductDetails, productDetails, recentlyWatched } = useProducts();
  const { addProductToCart, showAlert, setShowAlert, checkProductCart } =
    useCart();
  const { id } = useParams();

  useEffect(() => {
    getProductDetails(id);
  }, [id, getProductDetails]);

  const navigate = useNavigate();

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showAlert]);

  const MAX_RECENTLY_WATCHED = 5;

  const isYouTubeLink = (url) => {
    const youtubeUrlRegex =
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})$/;
    return youtubeUrlRegex.test(url);
  };

  const getEmbeddedTrailer = () => {
    const trailerUrl = productDetails?.trailer;

    if (trailerUrl && isYouTubeLink(trailerUrl)) {
      const videoId = trailerUrl.match(/([a-zA-Z0-9_-]{11})$/)[0];
      return (
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Product-Video"
          allowFullScreen
        />
      );
    }

    return null;
  };

  return (
    <Box
      className="product-details-container"
      sx={{ width: "75%", margin: "auto", marginBottom: "5%" }}
    >
      {showAlert && (
        <Alert
          sx={{ width: "40%", margin: "auto" }}
          onClose={() => {
            handleCloseAlert();
          }}
        >
          Успешно добавлено
        </Alert>
      )}
      <Box
        className="product-info"
        sx={{
          display: "flex",
          width: "100%",
          marginTop: "5%",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box
          className="product-info-img"
          sx={{ display: "flex", flexDirection: "column", width: "30%" }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "gray",
            }}
          >
            {productDetails?.category} / {productDetails?.title}
          </Typography>
          <CardMedia
            sx={{
              height: 300,
              width: "100%",
              marginTop: "5%",
            }}
            image={productDetails?.picture}
            title="green iguana"
          />
        </Box>

        <Box
          className="product-info-main"
          sx={{ width: "60%", marginTop: "5%" }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1em",
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ color: "#fff", fontWeight: "bold", fontSize: "2em" }}
              >
                {productDetails?.title}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ color: "#fff", fontWeight: "400", fontSize: "18px" }}
              >
                {productDetails?.description}
              </Typography>

              {checkProductCart(productDetails?.id) ? (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      width: "40%",
                      margin: "auto",
                      fontSize: "22px",
                      textAlign: "center",
                      padding: "2% 3%",
                      border: "1px solid gray",
                      borderRadius: "15px",
                      color: "rgb(255,255,255)",
                    }}
                  >
                    Уже в корзине
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Button
                    sx={{
                      width: "60%",
                      fontSize: "18px",
                      borderRadius: "10px 0px 0px 10px",
                    }}
                    startIcon={<AddShoppingCartIcon />}
                    color="secondary"
                    size="big"
                    onClick={() => addProductToCart(productDetails)}
                    variant="contained"
                  >
                    Добавить в корзину
                  </Button>
                  <Button
                    sx={{
                      width: "20%",
                      fontSize: "18px",
                      borderRadius: "0px 10px 10px 0px",
                    }}
                    color="error"
                    size="big"
                    onClick={() => addProductToCart(productDetails)}
                    variant="contained"
                  >
                    {productDetails?.price}$
                  </Button>
                </Box>
              )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}></Box>
          </CardContent>
        </Box>

        <Box
          className="product-info-trailer"
          sx={{ marginTop: "5%", width: "100%" }}
        >
          {getEmbeddedTrailer()}
        </Box>
      </Box>

      {recentlyWatched.length > 0 && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            marginTop: "10%",
          }}
        >
          <Typography sx={{ color: "rgb(255,255,255)" }}>
            Недавно просмотренные
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
            }}
          >
            {recentlyWatched.slice(0, MAX_RECENTLY_WATCHED).map((product) => (
              <Card
                sx={{
                  width: 180,
                  height: 300,
                  border: "1px solid #ccc",
                  backgroundColor: "transparent",
                  color: "white",
                  boxShadow: "0px 0px 8px 3px rgba(255, 1, 0, 0.5) inset",
                  borderRadius: "10px",
                  margin: "auto",
                  marginLeft: "0",
                  marginTop: 5,
                  cursor: "pointer",
                }}
                key={product.id}
                onClick={() => navigate(`/details/${product.id}`)}
              >
                <CardMedia
                  sx={{ width: 180, height: 140 }}
                  image={product.picture}
                  title="изображение"
                />
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                    gutterBottom
                    variant="h4"
                    component="div"
                  >
                    {product.title}
                  </Typography>
                  {product.price === 0 ? (
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "14px", textAlign: "center" }}
                    >
                      БЕСПЛАТНО
                    </Typography>
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "14px", textAlign: "center" }}
                    >
                      Цена: {product.price}$
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductDetails;
