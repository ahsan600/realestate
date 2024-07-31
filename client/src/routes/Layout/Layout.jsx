import React, { useContext, useEffect } from "react";
import "./layout.scss";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthContext } from "../../components/Context/AuthContext";
function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
function RequiredAuth() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, []);

  return (
    <div className="layout">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export { Layout, RequiredAuth };
