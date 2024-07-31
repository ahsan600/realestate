import React from "react";
import "./page404.scss";
import { useNavigate } from "react-router-dom";

function Page404() {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  return (
    <div className="page-404">
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <button onClick={handleHome}>Go Home</button>
    </div>
  );
}

export default Page404;
