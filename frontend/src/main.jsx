import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import App from "./App.jsx";
import "./index.css";

const cognitoAuthConfig = {
  authority: import.meta.env.VITE_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URI,
  response_type: "code",
  scope: "openid email profile",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
