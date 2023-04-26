
import { Link, NavLink } from "react-router-dom";
import { Stack } from "@mui/material";
import Logo from "../assets/images/Logo.png";

export const Navbar = () => {
  return (
    <Stack
    
      direction="row"
      justifyContent="space-around"
      sx={{
        backgroundColor: "black",
        overflowX: "auto",
        gap: { sm: "122px", xs: "40px" },
      //  mt: { sm: "32px", xs: "20px" },
        justifyContent: "none",
      }}
      px="20px"
    >
      <Link to="/">
        <img
          src={Logo}
          alt="logo"
          style={{
            width: "48px",
            height: "48px",
            margin: "0 20px",
          }}
        />
      </Link>

      <Stack direction="row" gap="40px" fontSize="24px" alignItems="flex-end">
        <NavLink
          to="/home"
          style={{
            backgroundColor: "black",
            textDecoration: "none",
            color: "#FFFFFF",
          }}
        >
          Home
        </NavLink>

        <NavLink
          to="/workout"
          style={{ textDecoration: "none", color: "#FFFFFF", }}
        >
          WorkoutLibrary
        </NavLink>

        <NavLink
          to="/fitnesstracking"
          style={{
            textDecoration: "none",
            color: "#FFFFFF",
          }}
        >
          Fitness Tracking
        </NavLink>

        <NavLink
          to="/community"
          style={{
            textDecoration: "none",
            color: "#FFFFFF",
          }}
        >
          Community
        </NavLink>

        <NavLink
          to="/signup"
          style={{
            textDecoration: "none",
            color: "#FFFFFF",
          }}
        >
          Register
        </NavLink>


      </Stack>
    </Stack>
  );
};




