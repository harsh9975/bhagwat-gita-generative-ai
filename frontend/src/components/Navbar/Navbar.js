// Navbar.js
import React from "react";
import "./Navbar.css";
import Button from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Mock function to check if the user is logged in
  const isLoggedIn = () => {
    const accessToken = localStorage.getItem("accessToken");
    return !!accessToken;
  };

  const handleNavigation = (screen) => {
    // Replace "/your-target-route" with the path you want to navigate to
    navigate(`/${screen}`);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => handleNavigation("")}>
        GitaGPT
      </div>
      <div className={`navbar-links`}>
        {isLoggedIn() ? (
          <span style={{ cursor: "pointer" }} onClick={handleLogout}>
            Logout
          </span>
        ) : (
          <Button label="Login" onClick={() => handleNavigation("login")} />
        )}
      </div>
      {/* <div className="navbar-toggle" onClick={toggleNavbar}>
        <span></span>
        <span></span>
        <span></span>
      </div> */}
    </nav>
  );
};

export default Navbar;
