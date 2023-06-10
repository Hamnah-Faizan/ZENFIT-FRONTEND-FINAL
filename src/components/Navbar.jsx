import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Stack } from "@mui/material";
import Logo from "../assets/images/Logo.png";
import Button from '@mui/material/Button';
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the role from local storage
    const storedRole = localStorage.getItem("role");

    // Update the role state
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleSignOut = () => {
    // Clear the role from local storage
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    // Update the role state
    setRole("");
    navigate('/login');
  };

  const renderLinks = () => {
    if (role === "Admin") {
      return (
        <>
          <NavLink
            to="/signup"
            className="nav-link"
            activeClassName="active-nav-link"
          >
            Register
          </NavLink>
        </>
      );
    } else if (role === "Trainer") {
      return (
        <>

          <NavLink
            to="/home"
            className="nav-link"
            activeClassName="active-nav-link"
          >
            Home
          </NavLink>
          <NavLink
            to="/workout"
            className="nav-link"
            activeClassName="active-nav-link"
          >
            Post Workout
          </NavLink>


        </>
      );
    } else if (role === "Customer") {
      return (
        <>
          <NavLink
            to="/home"
            className="nav-link"
            activeClassName="active-nav-link"
          >
            Home
          </NavLink>

          <NavLink
            to="/fitnesstracking"
            className="nav-link"
            activeClassName="active-nav-link"
          >
            Fitness Tracking
          </NavLink>

          <NavLink
            to="/library"
            className="nav-link"
            activeClassName="active-nav-link"
          >
            Personal Library
          </NavLink>
        </>
      );
    } else {
      // Default links for non-logged-in users
      return (
        <>
          <NavLink
            to="/signup"
            className="nav-link"
            activeClassName="active-nav-link"
          >
            Register
          </NavLink>

          <NavLink
            to="/home"
            className="nav-link"
            activeClassName="active-nav-link"
          >
            Home
          </NavLink>

        </>

        
      );
    }
  };

  return (
    <>
      {role && (
        <div className="navbar">
          <Link to="/">
            <img
              src={Logo}
              alt="logo"
              className="logo"
            />
          </Link>

          <div className="links">
            {renderLinks()}
          </div>

          <Button
            variant="outlined"
            onClick={handleSignOut}
            className="sign-out-btn"
          >
            Sign Out
          </Button>
        </div>
      )}
    </>
  );
};

export default Navbar;
