import { useEffect, useState } from "react";
import "./navbar.scss";
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "About",
      slug: "/about",
    },
    {
      name: "Contact",
      slug: "/contact",
    },
    {
      name: "Agents",
      slug: "/agents",
    },
    {
      name: "SignIn",
      slug: "/signin",
    },
    {
      name: "SignUp",
      slug: "/signup",
    },
  ];

  return (
    <nav>
      <div className="left">
        <Link className="logo" to="/">
          <img className="" src={logo} alt="" />
          <span className="logoName">AhsanState</span>
        </Link>
        {navItems.map(
          (item) =>
            item.name !== "SignIn" &&
            item.name !== "SignUp" && (
              <Link key={item.name} to={item.slug}>
                {item.name}
              </Link>
            )
        )}
      </div>
      <div className="right">
        {!auth ? (
          <>
            <Link to="/signin">SignIn</Link>
            <Link className="signOut" to="/signup">
              SignUp
            </Link>
          </>
        ) : (
          <>
            <div className="userImage">
              <img src={userData.avatar} alt="" />
              <span>{userData.username}</span>
            </div>
            <Link className="signOut" to="/profile">
              Profile
              <div className="icon">3</div>
            </Link>
          </>
        )}

        <div className="menulogo" onClick={() => setMenuOpen((pv) => !pv)}>
          <img src={menu} alt="/" />
        </div>
        <div className="menu" style={menuOpen ? { right: "0px" } : {}}>
          {navItems.map((item) => (
            <Link key={item.name} to={item.slug}>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
