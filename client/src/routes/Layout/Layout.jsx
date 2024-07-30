import React, { useEffect } from "react";
import "./layout.scss";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
  const auth = useSelector((state) => state.auth.isAuthenticated);
  console.log("lolo", auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) return navigate("/");
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
