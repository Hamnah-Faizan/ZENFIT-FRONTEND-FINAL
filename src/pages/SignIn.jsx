import * as React from 'react';
import { useState }  from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import signinimg from "../assets/images/signinimg.png";
import {  useNavigate } from 'react-router-dom';
import Home from "./Home";
import { Link as RouterLink } from 'react-router-dom';
import port from './config';



//const url = process.env.REACT_APP_PORT;




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        ZenFit
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export const SignIn = () => {

	const [data, setData] = useState({
    email: "", 
    password: "" 
  });

  const navigate = useNavigate();
	const [error, setError] = useState("");
  

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const url = "http://localhost:8000/User/login";
      await axios.post(url, data, config).then((response)=> {
              console.log(response.data)

        localStorage.setItem("token", JSON.stringify(response.data.accessToken));
        navigate("/home");
      })

    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${signinimg})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'teal' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                value={data.email}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
              />
              <TextField
                value={data.password}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="Password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" style={{ color: 'teal' }} />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                style={{ backgroundColor: 'teal', 
                color: 'white', 
                padding: '10px 20px', 
                borderRadius: '5px', 
                border: 'none' }}
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2"  style={{ color: 'teal'}}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2" style={{ color: "teal" }}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignIn;