import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/Authcontext.jsx";
import { ContextCategory } from "./context/categorycontext.jsx";
import ProductContext from "./context/ProductContext.jsx";
import SearchContext from "./context/SearchContext.jsx";
import CartContext from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
    <SearchContext>
      <AuthContext>
        <ContextCategory>
          <ProductContext>
            <CartContext>
            <App />
            </CartContext>
          </ProductContext>
        </ContextCategory>   
      </AuthContext>           
    </SearchContext>
    </BrowserRouter>
  </>
);
