import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import "./index.css";

const authority = import.meta.env.VITE_COGNITO_AUTHORITY;
const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
const redirectUri = import.meta.env.VITE_COGNITO_REDIRECT_URI;

if (!authority || !clientId || !redirectUri) {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "32rem" }}>
      <h1>Missing frontend environment</h1>
      <p>
        Copy <code>frontend/.env.example</code> to <code>frontend/.env</code> and
        set your Cognito values, then restart <code>npm run dev</code>.
      </p>
    </div>,
  );
} else {
  const cognitoAuthConfig = {
    authority,
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
  };

  ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
      <Toaster position="top-right" />
    </AuthProvider>
  </React.StrictMode>,
  );
}
