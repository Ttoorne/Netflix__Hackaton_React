import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ProductContextProvider from "./contexts/ProductContextProvider";
import AuthContextProvider from "./contexts/AuthContextProvider";
import CartContextProvider from "./contexts/CartContextProvider";
import LibraryContextProvider from "./contexts/LibraryContextProvider";
import CommentsContextProvider from "./contexts/CommentContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CommentsContextProvider>
      <LibraryContextProvider>
        <CartContextProvider>
          <AuthContextProvider>
            <ProductContextProvider>
              <App />
            </ProductContextProvider>
          </AuthContextProvider>
        </CartContextProvider>
      </LibraryContextProvider>
    </CommentsContextProvider>
  </BrowserRouter>
);
