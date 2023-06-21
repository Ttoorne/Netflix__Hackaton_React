import React, { useEffect } from "react";
import { useProducts } from "../../contexts/ProductContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";

const ProductDetails = () => {
  const { getProductDetails, productDetails, recentlyWatched } = useProducts();
  const { id } = useParams();

  useEffect(() => {
    getProductDetails(id);
  }, []);

  const navigate = useNavigate();

  const MAX_RECENTLY_WATCHED = 2;

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
      sx={{ width: "75%", margin: "auto" }}
    >
      <Box
        className="product-info"
        sx={{
          display: "flex",
          marginTop: "5%",
          flexDirection: "row",
          alignItems: "flex-start",
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
              height: 287,
              width: 272,
              marginTop: "5%",
            }}
            image={productDetails?.picture}
            title="green iguana"
          />
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              fontWeight: "400",
              fontSize: "16px",
              textAlign: "center",
              marginTop: "5%",
            }}
          >
            Цена: {productDetails?.price}$
          </Typography>
        </Box>

        <Box
          className="product-info-main"
          sx={{ width: "70%", marginTop: "5%" }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{ color: "#fff", fontWeight: "bold", fontSize: "29px" }}
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
    </Box>
  );
};

export default ProductDetails;
