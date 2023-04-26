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


    const handleChange = ({ target }) => {
      const { name, value } = target;
  
      let formattedValue = value;
      if (name === "dateofbirth") {
        const date = new Date(value);
        formattedValue = date.toISOString().split("T")[0];
      }
  
      setCustomerData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    };

    const handleSubmit = async (event) => {
      console.log("Customer Data"+customerData);
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
          console.log(response.data)
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: "100%", maxHeight: "100%", backgroundImage: `url(${signupimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <ThemeProvider theme={theme}>
        <Grid container component="main" maxWidth="xs">
          <CssBaseline />
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

              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

          <Grid container spacing={2}>
              <Grid item xs={12} sm={6} >
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
              <Grid item xs={12} sm={6} >
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
                  <RadioGroup aria-label="gender" name="gender" value={customerData.gender} onChange={handleChange} row>
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
                    InputLabelProps={{
                      shrink: true,
                    }}
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
              <div>
      <Button
      onClick={handleSubmit}
        fullWidth
        style={{ backgroundColor: "teal", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none" }}
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>
      {error && <div>{error}</div>}
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link component={RouterLink} to="/login" variant="body2" style={{ color: "teal" }}>
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
          </Box>
        </Box>
        </Grid>
        </Grid>       
    </ThemeProvider>
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
      trainer_specialization: "",
      trainer_description: "",
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: "100%", maxHeight: "100%", backgroundImage: `url(${signupimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <ThemeProvider theme={theme}>
        <Grid container component="main" maxWidth="xs">
          <CssBaseline />
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
                  <RadioGroup aria-label="gender" name="gender" value={trainerData.gender} onChange={handleChange} row>
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
                  value={trainerData.trainer_specialization}
                  onChange={handleChange}
                  margin="normal"
                    required
                    fullWidth
                    name="trainer_specialization"
                    label="Specialization"
                    id="trainer_specialization"
                  />
                  <TextField
                  type="text"
                  value={trainerData.trainer_description}
                  onChange={handleChange}
                  margin="normal"
                  required
                  fullWidth
                  name="trainer_description"
                  label="Description"
                  id="trainer_description"            
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
      onClick={handleSubmit}
        fullWidth
        style={{ backgroundColor: "teal", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none" }}
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Up
      </Button>
      {error && <div>{error}</div>}
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link component={RouterLink} to="/login" variant="body2" style={{ color: "teal" }}>
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
          </Box>
        </Box>
        </Grid>
        </Grid>      
    </ThemeProvider>
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: "100%", maxHeight: "100%", backgroundImage: `url(${signupimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <ThemeProvider theme={theme}>
        <Grid container component="main" maxWidth="xs">
          <CssBaseline />
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
              <form onSubmit={handleSubmit}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup aria-label="gender" name="gender" value={adminData.gender} onChange={handleChange} >
                    <FormControlLabel value="female" control={<Radio style={{ color: 'teal' }} />} label="Female" />
                    <FormControlLabel value="male" control={<Radio style={{ color: 'teal' }} />} label="Male" />
                    <FormControlLabel value="other" control={<Radio style={{ color: 'teal' }} />} label="Other" />            
                  </RadioGroup>
                </FormControl>
                </form>
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
      {error && <div>{error}</div>}
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link component={RouterLink} to="/login" variant="body2" style={{ color: "teal" }}>
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

          </Box>
        </Box>
        </Grid>
        </Grid>      
    </ThemeProvider>
    </div>
    
    )
  }


    
    
    
