import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./navigation.css";

const Navigation = () => {
  let navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userLoggedIn");
    toast.warn("Logged out successfully!");
    navigate("/");
  };

  return (
    <div>
      <div className="nav-wrapper">
        <div className="nav-left">
          {isLoggedIn ? (
            <Link to="/home" className="nav-link">
              Home
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="nav-right navi-right">
          {isLoggedIn ? (
            ""
          ) : (
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          )}

          {isLoggedIn ? (
            <button className="btns" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/" className="nav-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
