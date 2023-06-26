import React, { useEffect, useState } from "react";
import { useProducts } from "../../contexts/ProductContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "../../contexts/CartContextProvider";
import { useAuth } from "../../contexts/AuthContextProvider";
import { useLibrary } from "../../contexts/LibraryContextProvider";
import { ADMIN, API } from "../../helpers/consts";
import { useComment } from "../../contexts/CommentContextProvider";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const ProductDetails = () => {
  const { getProductDetails, productDetails, recentlyWatched } = useProducts();
  const { addProductToCart, showAlert, setShowAlert, checkProductCart } =
    useCart();
  const { id } = useParams();
  const { checkProductLibrary } = useLibrary();
  const { getComments, addComment, deleteComment, comments } = useComment();

  const {
    user: { email },
  } = useAuth();

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

  // comments
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    getComments();
  }, [getComments]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    const comment = {
      uniqueId: Date.now(),
      text: newComment,
      email: email,
      id: productDetails?.id,
    };
    if (!email) {
      navigate("/Auth");
      return;
    }
    addComment(comment);
    setNewComment("");
  };

  // random color
  // Функция для генерации случайного цвета в формате RGB
  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const [randomColor, setRandomColor] = useState(generateRandomColor());

  const handleGenerateColor = () => {
    const newColor = generateRandomColor();
    setRandomColor(newColor);
  };

  // likes and dislikes
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  return (
    <Box
      className="product-details-container"
      sx={{ width: "75%", margin: "auto", marginBottom: "5%" }}
    >
      {showAlert && (
        <Alert sx={{ width: "40%", margin: "auto" }} onClose={handleCloseAlert}>
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
              border: "2px solid rgba(35,35,35,1)",
              borderRadius: "4px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            }}
            image={productDetails?.picture}
            title="постер"
          />
          <Box sx={{ display: "flex", width: "35%", margin: "8% auto" }}>
            <Box sx={{ padding: "0 1%" }}>
              <Button sx={{ color: "rgb(255,255,255)" }} onClick={handleLike}>
                {likes}
                <ThumbUpOffAltIcon fontSize="large" />
              </Button>
            </Box>
            <Box sx={{ padding: "0 1%", color: "rgb(255,255,255)" }}>
              <Button
                sx={{ color: "rgb(255,255,255)" }}
                onClick={handleDislike}
              >
                {dislikes}
                <ThumbDownOffAltIcon fontSize="large" />
              </Button>
            </Box>
          </Box>
        </Box>

        <Box className="product-info-main" sx={{ width: "60%" }}>
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
                sx={{
                  color: "#fff",
                  fontWeight: "800",
                  fontSize: "2em",
                }}
              >
                {productDetails?.title}
                <hr
                  style={{
                    borderBottom: "1px solid rgba(35,35,35,1)",
                    marginTop: "1%",
                  }}
                />
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ color: "#fff", fontWeight: "400", fontSize: "18px" }}
              >
                {productDetails?.description}
              </Typography>
              {email === ADMIN ? null : checkProductLibrary(
                  productDetails?.id
                ) ? (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    marginTop: "5%",
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
                    Уже приобретено
                  </Typography>
                </Box>
              ) : checkProductCart(productDetails?.id) ? (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    marginTop: "5%",
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
              ) : email ? (
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "5%",
                  }}
                >
                  <Button
                    sx={{
                      width: "50%",
                      fontSize: "18px",
                      borderRadius: "10px 0px 0px 10px",
                      backgroundColor: "rgb(229, 9, 20)",
                      "&:hover": {
                        backgroundColor: "rgb(229, 9, 20)",
                        filter: "brightness(0.8)",
                        color: "white",
                      },
                    }}
                    startIcon={<AddShoppingCartIcon />}
                    size="big"
                    onClick={() => addProductToCart(productDetails)}
                    variant="contained"
                  >
                    Добавить в корзину
                  </Button>
                  {productDetails?.price > 0 ? (
                    <Button
                      sx={{
                        width: "10%",
                        fontWeight: "700",
                        fontSize: "18px",
                        color: "black",
                        borderRadius: "0px 10px 10px 0px",
                        backgroundColor: "white",
                        "&:hover": {
                          filter: "brightness(0.8 )",
                          background: "white",
                          color: "black",
                        },
                      }}
                      size="big"
                      onClick={() => addProductToCart(productDetails)}
                      variant="contained"
                    >
                      {productDetails?.price}$
                    </Button>
                  ) : (
                    <Button
                      sx={{
                        width: "30%",
                        fontWeight: "500",
                        fontSize: "18px",
                        borderRadius: "0px 10px 10px 0px",
                        color: "black",
                        backgroundColor: "white",
                        "&:hover": {
                          filter: "brightness(0.8 )",
                          background: "white",
                          color: "black",
                        },
                      }}
                      color="error"
                      size="big"
                      onClick={() => addProductToCart(productDetails)}
                      variant="contained"
                    >
                      БЕСПЛАТНО
                    </Button>
                  )}
                </Box>
              ) : null}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}></Box>
          </CardContent>
        </Box>

        <Box
          className="product-info-trailer"
          sx={{
            marginTop: "5%",
            width: "100%",
          }}
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
                  height: 260,
                  border: "1px solid #ccc",
                  backgroundColor: "transparent",
                  color: "white",
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
                  sx={{ width: 180, height: 200 }}
                  image={product.picture}
                  title="изображение"
                />
                <CardContent>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "800",
                      textAlign: "center",
                    }}
                    gutterBottom
                    variant="h4"
                    component="div"
                  >
                    {product.title}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
      <Box
        className="comments"
        sx={{
          marginTop: "10%",
          color: "rgb(255,255,255)",
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: "3%", fontSize: "25px", fontWeight: "600" }}
        >
          Комментарии (
          {
            comments.filter((comment) => comment?.id === productDetails?.id)
              .length
          }
          )
        </Typography>

        {comments.map((comment) =>
          productDetails?.id === comment?.id ? (
            <Card
              key={comment.uniqueId}
              sx={{
                marginBottom: "2%",
                borderRadius: "20px",
                padding: "0 0 1% 1%",
                background: "transparent",
                border: "1px solid rgb(35, 35, 35)",
              }}
            >
              <CardContent sx={{ display: "flex" }}>
                <Box sx={{ padding: "5px 2% 1% 0" }}>
                  <Avatar
                    alt={comment.email}
                    sx={{
                      backgroundColor:
                        comment.email === email ? randomColor : null,
                    }}
                    src="/static/images/avatar/2.jpg"
                  />
                </Box>
                <Box
                  sx={{
                    color: "rgb(255,255,255)",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "600" }}>
                    {comment.email}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "400" }}>
                    {comment.text}
                  </Typography>
                  {email === comment.email || email === ADMIN ? (
                    <Button
                      variant="outlined"
                      onClick={() => deleteComment(comment.uniqueId)}
                      sx={{
                        marginTop: "2%",
                        alignSelf: "flex-end",
                        width: "30%",
                        border: "none",
                        color: "#e30914",
                        borderRadius: "15px",
                        "&:hover": {
                          border: "none",
                          color: "red",
                          backgroundColor: "rgb(35, 35, 35)",
                          borderRadius: "15px",
                        },
                      }}
                    >
                      Удалить комментарий
                    </Button>
                  ) : null}
                </Box>
              </CardContent>
            </Card>
          ) : null
        )}

        <Box sx={{ marginTop: "7%" }}>
          <TextField
            id="comment"
            label="Оставьте комментарий"
            variant="filled"
            multiline
            rows={4}
            fullWidth
            value={newComment}
            onChange={handleCommentChange}
            sx={{
              borderRadius: "20px",
              padding: "1% 3%",
              background: "transparent",
              color: "rgb(255,255,255) !important",
              border: "3px solid rgb(35, 35, 35)",
            }}
            InputLabelProps={{ sx: { color: "gray", paddingLeft: "2%" } }}
            InputProps={{
              sx: {
                color: "rgb(255, 255, 255)",
              },
            }}
          />

          <Button
            variant="contained"
            onClick={handleAddComment}
            sx={{ marginTop: "2%", padding: "1% 2%", borderRadius: "20px" }}
          >
            Добавить комментарий
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetails;
