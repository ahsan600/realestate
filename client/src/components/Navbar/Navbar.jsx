import { useState } from "react";
import "./navbar.scss";
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.png";
// import menu from "../../assets/menu.png";
import { Link } from "react-router-dom";
import { userData } from "../../lib/dummyData";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = userData;
  console.log(user.name);
  let auth = false;
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
        {auth ? (
          <>
            <Link to="login">SignIn</Link>
            <Link className="signOut" to="/register">
              SignUp
            </Link>
          </>
        ) : (
          <>
            <div className="userImage">
              <img src={user.img} alt="" />
              <span>{user.name}</span>
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
