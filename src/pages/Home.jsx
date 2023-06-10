import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { HeroBanner } from "../components/HeroBanner";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/system";
import {  useNavigate } from 'react-router-dom';

const CardContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  height: 420px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled(CardMedia)`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Video = styled("video")`
  width: 100%;
  height: 200px;
`;

const CardGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding-left: 20px;
`;

const ExerciseCardContainer = styled(Card)`
  margin-top: 20px;
`;

const WorkoutDetails = ({ selectedWorkout }) => {
  return (
    <ExerciseCardContainer>
      <CardContent>
        <Typography variant="h6">Workout Details</Typography>
        <Typography>Name: {selectedWorkout.workout_name}</Typography>
        <Typography>Description: {selectedWorkout.workout_description}</Typography>
        <Typography>Goal: {selectedWorkout.goal}</Typography>
        <Typography>Price: {selectedWorkout.workout_price}</Typography>
        <Typography>Calories Burned: {selectedWorkout.calories_burned}</Typography>
        <Typography>Duration: {selectedWorkout.duration}</Typography>
        <Typography>Difficulty Level: {selectedWorkout.difficulty_level}</Typography>
        <Typography>Created By: {selectedWorkout.created_by}</Typography>
      </CardContent>
      <Typography variant="h6">Exercises:</Typography>
      {selectedWorkout.exercises.length > 0 ? (
        <CardGrid>
          {selectedWorkout.exercises.map((exercise) => (
            <CardContainer key={exercise.id}>
              <CardContent>
                <Typography variant="subtitle1">Exercise Name: {exercise.name}</Typography>
                <Typography variant="body2">Exercise Description: {exercise.description}</Typography>
                <Typography variant="body2">Exercise Duration: {exercise.duration}</Typography>
                <Typography variant="subtitle2">Exercise Video:</Typography>
                {exercise.video && (
                  <Video controls>
                    <source src={exercise.video} type="video/mp4" />
                  </Video>
                )}
              </CardContent>
            </CardContainer>
          ))}
        </CardGrid>
      ) : (
        <Typography variant="body2" color="textSecondary">
          No exercises available for this workout
        </Typography>
      )}
    </ExerciseCardContainer>
  );
};

export const Home = () => {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [exerciseList, setExerciseList] = useState([]);
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);
  const [cardType, setCardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/WorkoutLibrary/workouts"
      );
      const responseData = response.data;

      setWorkouts(responseData?.workout);
      console.log(responseData.workout)

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching workouts:", error);
      setIsLoading(false);
    }
  };

  const fetchExercises = async (workoutId) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
    
      const response = await axios.get(
        `http://localhost:8000/WorkoutLibrary/workouts/:id`,
        config
      );
      
      const responseData = response.data;

      setExerciseList(responseData?.exercises);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  const handleWorkoutClick = async (workout) => {
    if (selectedWorkout && selectedWorkout.id === workout.id) {
      setSelectedWorkout(null);
    } else {
      setSelectedWorkout(workout);
      await fetchExercises(workout.id);
    }
  };



  const handleAddToCart = (workout) => {
    console.log("from inside the function", workout);
    setSelectedWorkout(workout);
    setIsCheckoutDialogOpen(true);
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "cardType":
        setCardType(value);
        break;
      case "cardNumber":
        setCardNumber(value);
        break;
      case "expiryDate":
        setExpiryDate(value);
        break;
      case "cvv":
        setCvv(value);
        break;
      default:
        break;
    }
  };

  const handleCheckoutConfirm = async () => {
    console.log(selectedWorkout);
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post(
        "http://localhost:8000/Customer/payment",
        {
          workout: selectedWorkout?._id,
          cardType,
          cardNumber,
          expiryDate,
          cvv,
        },
        config
      );

      const responseData = response.data;
      setIsPaymentSuccessful(true);
      console.log(responseData);

      setCardType("");
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
      setIsCheckoutDialogOpen(false);

      navigate("/library");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };


  if (isLoading) {
    return (
      <Box>
        <HeroBanner />
        <div className="App">
          <h1>Please wait, loading...</h1>
        </div>
      </Box>
    );
  }

  return (
    <Box>
      <HeroBanner style={{ height: "100px" }} />
      <div className="Home">
        <Typography variant="h4">Workouts</Typography>
        {workouts.length > 0 ? (
          <CardGrid>
            {workouts.map((workout,index) => (
              <CardContainer
                key={workout.id}
              >
                {workout.workout_thumbnail && (
                  <Image
                    component="img"
                    height="140"
                    image={workout.workout_thumbnail}
                  />
                )}
                <CardContent>
                  <Typography variant="h6">Name: {workout.workout_name}</Typography>
                  <Typography variant="body2">Description: {workout.workout_description}</Typography>
                  <Typography variant="body2">Goal: {workout.goal}</Typography>
                  <Typography variant="body2">Price: {workout.workout_price}</Typography>
                  <Typography variant="body2">Calories Burned: {workout.calories_burned}</Typography>
                  <Typography variant="body2">Duration: {workout.duration}</Typography>
                  <Typography variant="body2">Difficulty Level: {workout.difficulty_level}</Typography>
                  <Typography variant="body2">Created By: {workout.created_by}</Typography>
                </CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ bgcolor: 'teal', mt: 1 }}
                  onClick = {()=>{
                    console.log("AAAAAA");
                    console.log(workout);
                    handleAddToCart(workout);
                  }
                }
                >
                  Add to Cart
                </Button>
              </CardContainer>
            ))}
          </CardGrid>
        ) : (
          <Typography variant="h6" color="textSecondary">
            No workouts available
          </Typography>
        )}
        {selectedWorkout && <WorkoutDetails selectedWorkout={selectedWorkout} />}
        <Dialog
          open={isCheckoutDialogOpen}
          onClose={() => setIsCheckoutDialogOpen(false)}
        >
          <DialogTitle>Checkout</DialogTitle>
          <DialogContent>
            <TextField
              type="text"
              name="cardType"
              value={cardType}
              onChange={handleCardInputChange}
              label="Card Type"
              margin="normal"
              fullWidth
              required
            />
            <TextField
              type="number"
              name="cardNumber"
              value={cardNumber}
              onChange={handleCardInputChange}
              label="Card Number"
              margin="normal"
              fullWidth
              required
            />
            <TextField
              type="date"
              name="expiryDate"
              value={expiryDate}
              onChange={handleCardInputChange}
              label="Expiry Date"
              margin="normal"
              fullWidth
              required
            />
            <TextField
              type="number"
              name="cvv"
              value={cvv}
              onChange={handleCardInputChange}
              label="CVV"
              margin="normal"
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsCheckoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCheckoutConfirm} color="primary">
              Proceed to Checkout
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    </Box>
  );
};

export default Home;
