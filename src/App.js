import { Box } from "@mui/material";
import { Routes } from "./routes/Routes";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";


export function App() {
  return (
    <Box width="400px" sx={{ width: { xl: "1488px" } }} m="auto">
        <Routes />
    </Box>
  );
}

export default App;


