import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./components/Context/AuthContext.jsx";
import { PostContextProvider } from "./components/Context/PostContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <ToastContainer />
        <App />
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
