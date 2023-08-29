import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="harakeke-2023-jiho.au.auth0.com"
      clientId="ZABaXXx1EaHv2GhDUMYu2AEEOgyJ5d5Y"
      authorizationParams={{
        redirect_uri: "https://fullstack-real-estate.vercel.app/",
      }}
      audience="https://fullstack-real-estate-server.vercel.app/"
      scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
