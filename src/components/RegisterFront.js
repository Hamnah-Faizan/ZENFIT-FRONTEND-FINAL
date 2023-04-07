import React from 'react';
//import { Box } from "@mui/material";

//import { signupimg } from "../components/SignUp";
import signupimg from "../assets/images/signupimg.png";


const styles = {
    container: {
      height: '100vh',
      backgroundImage: `url(${signupimg})`,
      backgroundSize: 'cover',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'teal',
      padding: '20px',
      borderRadius: '5px',
    },
    button: {
      margin: '10px',
      padding: '10px',
      color: 'white',
      backgroundColor: 'teal',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };
  
export function RegisterFront() {
    return (
      <div style={styles.container}>
        <div style={styles.buttonContainer}>
          <button style={styles.button}>Sign up as user</button>
          <button style={styles.button}>Sign up as trainer</button>
          <button style={styles.button}>Sign up as admin</button>
        </div>
      </div>
    );
  }
  
  export default RegisterFront;