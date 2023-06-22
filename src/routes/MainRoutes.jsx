import React from "react";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import CartPage from "../pages/CartPage";
import AdminPage from "../pages/AdminPage";
import EditProductPage from "../pages/EditProductPage";
import { Navigate, Route, Routes } from "react-router-dom";
import SeriesPage from "../pages/SeriesPage";
import FilmsPage from "../pages/FilmsPage";
import CartoonsPage from "../pages/CartoonsPage";
import ProductPage from "../pages/ProductPage";
import AuthPage from "../pages/AuthPage";
import { useAuth } from "../contexts/AuthContextProvider";
import { ADMIN } from "../helpers/consts";
import ProductDetail from "../components/ProductDetails/ProductDetails";

const MainRoutes = () => {
  const PUBLIC_ROUTES = [
    {
      link: "/",
      element: <HomePage />,
      id: 1,
    },

    {
      link: "*",
      element: <NotFoundPage />,
      id: 3,
    },
    {
      link: "/series",
      element: <SeriesPage />,
      id: 4,
    },

    {
      link: "/details/:id",
      element: <ProductDetail />,
      id: 6,
    },
    {
      link: "/cart",
      element: <CartPage />,
      id: 7,
    },
    {
      link: "/films",
      element: <FilmsPage />,
      id: 8,
    },
    {
      link: "/cartoons",
      element: <CartoonsPage />,
      id: 9,
    },

    {
      link: "/products",
      element: <ProductPage />,
      id: 10,
    },
    {
      link: "/auth",
      element: <AuthPage />,
      id: 10,
    },
    {
      link: "/edit/:id",
      element: <EditProductPage />,
      id: 5,
    },
    {
      link: "/admin",
      element: <AdminPage />,
      id: 2,
    },
  ];

  const PRIVATE_ROUTES = [];

  const { user } = useAuth();

  return (
    <Routes>
      {PUBLIC_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id} />
      ))}

      {user
        ? PRIVATE_ROUTES.map((item) => (
            <Route
              key={item.id}
              path={item.link}
              element={
                user.email === ADMIN ? item.element : <Navigate to="*" />
              }
            />
          ))
        : null}
    </Routes>
  );
};

export default MainRoutes;
