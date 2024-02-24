import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/Authcontext.jsx";
import { ContextCategory } from "./context/categorycontext.jsx";
import ProductContext from "./context/ProductContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <AuthContext>
        <ContextCategory>
          <ProductContext>
          <App />
          </ProductContext>
        </ContextCategory>   
      </AuthContext>
    </BrowserRouter>
  </>
);
