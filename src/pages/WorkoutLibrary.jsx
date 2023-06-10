import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import workoutlibrary from "../assets/images/workoutlibrary.jpg";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import workoutimg from "../assets/images/workoutimg.jpg";


const theme = createTheme();

export const WorkoutLibrary = () => {
  const [newWorkout, setNewWorkout] = useState({
    workout_name: '',
    difficulty_level: '',
    workout_description: '',
    goal: '',
    calories_burned: '',
    duration: '',
    workout_price: '',
    payment_successful: false,
    workout_thumbnail: ''
  });

  const [exercises, setExercises] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewWorkout((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleExerciseInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedExercises = [...exercises];
    updatedExercises[index] = {
      ...updatedExercises[index],
      [name]: value
    };
    setExercises(updatedExercises);
  };

  const handleAddExercise = () => {
    setExercises([...exercises, { exercise_name: '', exercise_duration: '', exercise_description: '', exercise_video: '' }]);
  };

  const handleRemoveExercise = (index) => {
    const updatedExercises = [...exercises];
    updatedExercises.splice(index, 1);
    setExercises(updatedExercises);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const config = {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      };

      const workoutData = { ...newWorkout, exercises };

      const url = 'http://localhost:8000/WorkoutLibrary/workout';

      await axios.post(url, workoutData, config).then((response) => {
        console.log(response.data);
        setNewWorkout({
          workout_name: '',
          difficulty_level: '',
          workout_description: '',
          goal: '',
          calories_burned: '',
          duration: '',
          workout_price: '',
          payment_successful: false,
          workout_thumbnail: ''
        });
        setExercises([]);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
        backgroundImage: `url(${workoutlibrary})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
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
                alignItems: 'center'
              }}
            >
              <Card>
                <CardContent>
                  <Typography component="h1" variant="h5">
                    Workout Library Form
                  </Typography>
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          value={newWorkout.workout_name}
                          onChange={handleInputChange}
                          margin="normal"
                          id="workout_name"
                          label="Workout Name"
                          name="workout_name"
                          required
                          fullWidth
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Difficulty Level</FormLabel>
                          <RadioGroup
                            aria-label="difficulty-level"
                            name="difficulty_level"
                            value={newWorkout.difficulty_level}
                            onChange={handleInputChange}
                          >
                            <FormControlLabel value="Beginner" control={<Radio style={{ color: 'teal' }} />} label="Beginner" />
                            <FormControlLabel value="Intermediate" control={<Radio style={{ color: 'teal' }} />} label="Intermediate" />
                            <FormControlLabel value="Advanced" control={<Radio style={{ color: 'teal' }} />} label="Advanced" />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          value={newWorkout.workout_description}
                          onChange={handleInputChange}
                          margin="normal"
                          id="workout_description"
                          label="Workout Description"
                          name="workout_description"
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          value={newWorkout.goal}
                          onChange={handleInputChange}
                          margin="normal"
                          id="goal"
                          label="Goal"
                          name="goal"
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="number"
                          value={newWorkout.calories_burned}
                          onChange={handleInputChange}
                          margin="normal"
                          id="calories_burned"
                          label="Calories Burned"
                          name="calories_burned"
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          value={newWorkout.duration}
                          onChange={handleInputChange}
                          margin="normal"
                          id="duration"
                          label="Duration"
                          name="duration"
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          value={newWorkout.workout_price}
                          onChange={handleInputChange}
                          margin="normal"
                          id="workout_price"
                          label="Workout Price"
                          name="workout_price"
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={newWorkout.payment_successful}
                              onChange={() =>
                                setNewWorkout((prevState) => ({
                                  ...prevState,
                                  payment_successful: !prevState.payment_successful
                                }))
                              }
                              name="payment_successful"
                              color="primary"
                            />
                          }
                          label="Payment Successful"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          value={newWorkout.workout_thumbnail}
                          onChange={handleInputChange}
                          margin="normal"
                          id="workout_thumbnail"
                          label="Workout Thumbnail URL"
                          name="workout_thumbnail"
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          type="text"
                          value={newWorkout.created_by}
                          onChange={handleInputChange}
                          margin="normal"
                          id="created_by"
                          label="created_by"
                          name="created_by"
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                          Exercises
                        </Typography>
                        {exercises.map((exercise, index) => (
                          <Card key={index}>
                            <CardHeader title={`Exercise ${index + 1}`} />
                            <CardContent>
                              <TextField
                                type="text"
                                value={exercise.exercise_name}
                                onChange={(event) => handleExerciseInputChange(event, index)}
                                margin="normal"
                                id={`exercise_name_${index}`}
                                label="Exercise Name"
                                name="exercise_name"
                                required
                                fullWidth
                              />
                              <TextField
                                type="text"
                                value={exercise.exercise_duration}
                                onChange={(event) => handleExerciseInputChange(event, index)}
                                margin="normal"
                                id={`exercise_duration_${index}`}
                                label="Exercise Duration"
                                name="exercise_duration"
                                required
                                fullWidth
                              />
                              <TextField
                                type="text"
                                value={exercise.exercise_description}
                                onChange={(event) => handleExerciseInputChange(event, index)}
                                margin="normal"
                                id={`exercise_description_${index}`}
                                label="Exercise Description"
                                name="exercise_description"
                                required
                                fullWidth
                              />
                              <TextField
                                type="text"
                                value={exercise.exercise_video}
                                onChange={(event) => handleExerciseInputChange(event, index)}
                                margin="normal"
                                id={`exercise_video_${index}`}
                                label="Exercise Video URL"
                                name="exercise_video"
                                required
                                fullWidth
                              />
                              <Button style={{ backgroundColor: "teal", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none" }} onClick={() => handleRemoveExercise(index)}>Remove Exercise</Button>
                            </CardContent>
                          </Card>
                        ))}
                        <Button onClick={handleAddExercise}>Add Exercise</Button>
                      </Grid>
                    </Grid>
                    <Button type="submit" fullWidth style={{ backgroundColor: "teal", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none" }} variant="contained" sx={{ mt: 3, mb: 2 }}>
                      Add Workout
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default WorkoutLibrary;




