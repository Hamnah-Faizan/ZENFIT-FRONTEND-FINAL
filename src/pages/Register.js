import React, { useState }  from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import signupimg from "../assets/images/signupimg.png";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import SignIn from "../pages/SignIn";


/*
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
*/


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

export const SignUp = () => {

  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showTrainerForm, setShowTrainerForm] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);

  const handleCustomerClick = () => {
    setShowCustomerForm(true);
    setShowTrainerForm(false);
    setShowAdminForm(false);
  };

  const handleTrainerClick = () => {
    setShowCustomerForm(false);
    setShowTrainerForm(true);
    setShowAdminForm(false);
  };

  const handleAdminClick = () => {
    setShowCustomerForm(false);
    setShowTrainerForm(false);
    setShowAdminForm(true);
  };


  return (

 
    <div>

      <button fullWidth style={{ backgroundColor: "teal", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none" }} sx={{ mt: 3, mb: 2 }} onClick={handleCustomerClick}>Signup as Customer</button>
      <button fullWidth style={{ backgroundColor: "teal", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none" }} sx={{ mt: 3, mb: 2 }} onClick={handleTrainerClick}>Signup as Trainer</button>
      <button fullWidth style={{ backgroundColor: "teal", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none" }} sx={{ mt: 3, mb: 2 }} onClick={handleAdminClick}>Signup as Admin</button>

      {showCustomerForm && <CustomerSignupForm />}
      {showTrainerForm && <TrainerSignupForm />}
      {showAdminForm && <AdminSignupForm />}
    </div>
  );
}


  function CustomerSignupForm() {

    const [showSignIn, setShowSignIn] = useState(false);
    const [error, setError] = useState("");

    const [customerData, setCustomerData] = useState({
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      gender: "",
      dateofbirth: "",
      weight: "",
      height: "",
    });



    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
      setCustomerData({ ...customerData, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        }; 
  
        const url = "http://localhost:8000/User/signup";
        console.log(customerData)
        await axios.post(url, customerData, config).then((response)=> {
          console.log(response.customerData)
          localStorage.setItem("token", customerData);
          console.log(localStorage.getItem('token'));
          navigate("/login");
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
      <div>
        <h2>Customer Signup Form</h2>
        <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      //height: '200vh',
      maxWidth: "100%", maxHeight: "100%"
    }}
  >
    <ThemeProvider theme={theme}>
   
    <Grid container component="main" sx={{ maxWidth: 'xs' }}>
        <CssBaseline />
        <Grid
         
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${signupimg})`,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
           
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

       
              <Grid item xs={12} >
                <TextField
                type="text"
                value={customerData.firstname}
                onChange={handleChange}
                 margin="normal"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus                  
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                type="text"
                value={customerData.lastname}
                onChange={handleChange}
                margin="normal"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 type="text"
                 value={customerData.username}
                 onChange={handleChange}             
                margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                value={customerData.email}
                onChange={handleChange}
                margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                type="password"
                value={customerData.password}
                onChange={handleChange}
                margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup aria-label="gender" name="gender" value={customerData.gender} onChange={handleChange} >
                    <FormControlLabel value="female" control={<Radio style={{ color: 'teal' }} />} label="Female" />
                    <FormControlLabel value="male" control={<Radio style={{ color: 'teal' }} />} label="Male" />
                    <FormControlLabel value="other" control={<Radio style={{ color: 'teal' }} />} label="Other" />            
                  </RadioGroup>
                </FormControl>
                </form>
              </Grid>

                    <TextField
                type="date"
                value={customerData.dateofbirth}
                onChange={handleChange}
                    margin="normal"
                    required
                    fullWidth
                    name="dateofbirth"
                    id="dateofbirth"
               
                  />
                  <TextField
                type="number"
                value={customerData.weight}
                onChange={handleChange}
                  margin="normal"
                    required
                    fullWidth
                    name="weight"
                    label="Weight"
                    id="weight"
                  
                  />
                  <TextField
                  type="text"
                  value={customerData.height}
                  onChange={handleChange}
                  margin="normal"
                    required
                    fullWidth
                    name="height"
                    label="Height"
                    id="height"                
                  />
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="agreeTerms" style={{ color: 'teal' }} />}
                  label="I agree to the terms and conditions"
                  required
                />
              </Grid>   
              <div>
      <Button
        fullWidth
        style={{ backgroundColor: "teal", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none" }}
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>

      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link component={RouterLink} to="/signin" variant="body2" style={{ color: "teal" }}>
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>

      {showSignIn && (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "white", zIndex: 999 }}>
          <SignIn />
        </div>
      )}
    </div>
                      
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
        </Grid>
        </Grid>      
    </ThemeProvider>
    </div>

      </div>
    );
  }


  function TrainerSignupForm() {

    const [showSignIn] = useState(false);
    const [error, setError] = useState("");

    const [trainerData, setTrainerData] = useState({
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      gender: "",
      specialization: "",
      description: "",
    });


    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
      setTrainerData({ ...trainerData, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        };
  
        const url = "http://localhost:8000/User/signup";
        const response = await axios.post(url, trainerData, config);
        console.log(response.trainerData)
        localStorage.setItem("token", trainerData);
        navigate("/login");
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
      <div>
        <h2>Trainer Signup Form</h2>
        
        <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: "100%", maxHeight: "100%"
    }}
  >
    <ThemeProvider theme={theme}>
   
      <Grid container component="main" maxWidth="xs" >
        <CssBaseline />
        <Grid
         
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${signupimg})`,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
           
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

       
              <Grid item xs={12} >
                <TextField
                type="text"
                value={trainerData.firstname}
                onChange={handleChange}
                 margin="normal"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus                  
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                type="text"
                value={trainerData.lastname}
                onChange={handleChange}
                margin="normal"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                type="text"
                value={trainerData.username}
                onChange={handleChange}
                margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                value={trainerData.email}
                onChange={handleChange}
                margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                value={trainerData.password}
                onChange={handleChange}
                margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  type='password'
                />
              </Grid>
              <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup aria-label="gender" name="gender" value={trainerData.gender} onChange={handleChange} >
                    <FormControlLabel value="female" control={<Radio style={{ color: 'teal' }} />} label="Female" />
                    <FormControlLabel value="male" control={<Radio style={{ color: 'teal' }} />} label="Male" />
                    <FormControlLabel value="other" control={<Radio style={{ color: 'teal' }} />} label="Other" />            
                  </RadioGroup>
                </FormControl>
                </form>
              </Grid>

                  <Grid item xs={12}>
                  <TextField
                  type="text"
                  value={trainerData.specialization}
                  onChange={handleChange}
                  margin="normal"
                    required
                    fullWidth
                    name="specialization"
                    label="Specialization"
                    id="specialization"
                  />
                  <TextField
                  type="text"
                  value={trainerData.description}
                  onChange={handleChange}
                  margin="normal"
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  id="description"            
                  />
                  
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="agreeTerms" style={{ color: 'teal' }} />}
                  label="I agree to the terms and conditions"
                  required
                />
              </Grid>   
              <div>
      <Button
        fullWidth
        style={{ backgroundColor: "teal", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none" }}
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>

      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link component={RouterLink} to="/signin" variant="body2" style={{ color: "teal" }}>
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>

      {showSignIn && (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "white", zIndex: 999 }}>
          <SignIn />
        </div>
      )}
    </div>
                      
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
        </Grid>
        </Grid>      
    </ThemeProvider>
    </div>

      </div>
    );
  }



  
  function AdminSignupForm() {

    const [showSignIn, setShowSignIn] = useState(false);
    const [error, setError] = useState("");

    const [adminData, setAdminData] = useState({
      firstname: "",
      lastname: "",
      username: "",
      gender: "",
      email: "",
      password: "",
    });

    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
      setAdminData({ ...adminData, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const config = {
          headers: {
            "content-type": "application/json",
          },
        };
  
  
  
        const url = "http://localhost:8000/User/signup";
        const response = await axios.post(url, adminData, config);
        console.log(response.adminData)
        localStorage.setItem("token", adminData);
        navigate("/login");
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
      <div>
        <h2>Admin Signup Form</h2>

        <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      //height: '200vh',
      maxWidth: "100%", maxHeight: "100%"
    }}
  >
    <ThemeProvider theme={theme}>
   
      <Grid container component="main" maxWidth="xs" >
        <CssBaseline />
        <Grid
         
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${signupimg})`,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
           
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

       
              <Grid item xs={12} >
                <TextField
                type="text"
                value={adminData.firstname}
                onChange={handleChange}
                 margin="normal"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus                  
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                type="text"
                value={adminData.lastname}
                onChange={handleChange}
                margin="normal"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 type="text"
                 value={adminData.username}
                 onChange={handleChange}              
                margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                value={adminData.email}
                onChange={handleChange}
                margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                type="password"
                value={adminData.password}
                onChange={handleChange}
                margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="agreeTerms" style={{ color: 'teal' }} />}
                  label="I agree to the terms and conditions"
                  required
                />
              </Grid>   
              <div>
      <Button
        fullWidth
        style={{ backgroundColor: "teal", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none" }}
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>

      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link component={RouterLink} to="/signin" variant="body2" style={{ color: "teal" }}>
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>

      {showSignIn && (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "white", zIndex: 999 }}>
          <SignIn />
        </div>
      )}
    </div>
                      
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
        </Grid>
        </Grid>      
    </ThemeProvider>
    </div>

      </div>
       
    
    );
  }


    
    
    

export default SignUp;
