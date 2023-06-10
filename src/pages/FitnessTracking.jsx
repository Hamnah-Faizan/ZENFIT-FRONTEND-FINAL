import * as React from 'react';
import { useState, useEffect }  from 'react';
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
import fitnesstracking from "../assets/images/fitnesstracking.jpg";
import {  useNavigate } from 'react-router-dom';
import port from './config';


const theme = createTheme();

export const FitnessTracking = () => {

  const navigate = useNavigate();



  const [data, setData] = useState({
    date: '',
    calories_eaten: '',
    daily_calories: '',
    weight: '',
    bmi: '',
    height: ''
  });

  
  const [trackingList, setTrackingList] = useState([]);

  const [error, setError] = useState("");


  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = JSON.parse(localStorage.getItem('token'));
      
      const config = {
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      };

      const url = "http://localhost:8000/FitnessTracking/fitnesstracking";
      await axios.post(url, data, config).then((response)=> {
        console.log(response.data)
        const newTracking = { ...data, id: response.data.id };
        setTrackingList([...trackingList, newTracking]);
        navigate("/library");
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
      <Grid container component="main" sx={{ height: '100vh'}}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${fitnesstracking})`,
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
              justifyContent: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'teal' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Fitness Tracking
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                type='date'
                value={data.date}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                id="date"
                label="Date"
                name="date"
                autoFocus
              />
              <TextField
                value={data.calories_eaten}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="calories_eaten"
                label="Calories Eaten"
                type="number"
                id="calories_eaten"
              />
              <TextField
                value={data.daily_calories}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="daily_calories"
                label="Daily Calories"
                type="number"
                id="daily_calories"
              />
              <TextField
                value={data.bmi}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="bmi"
                label="BMI"
                type="number"
                id="bmi"
              />
              <TextField
                value={data.weight}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="weight"
                label="Weight"
                type="number"
                id="weight"
              />
                <TextField
                value={data.height}
                onChange={handleChange}
                margin="normal"
                required
                fullWidth
                name="height"
                label="height"
                type="string"
                id="height"
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
                Add Tracking
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

    </ThemeProvider>
  );
}

export default FitnessTracking;
