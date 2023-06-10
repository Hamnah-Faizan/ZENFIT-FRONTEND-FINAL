import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import LinearProgress from '@mui/material/LinearProgress';

export const UserProfile = () => {
  const [purchasedWorkouts, setPurchasedWorkouts] = useState([]);
  const [trackingData, setTrackingData] = useState([]);
  const [personalLibraryData, setPersonalLibraryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const fetchUserProfile = async () => {
        try {
          const response = await fetch(
            'http://localhost:8000/PersonalLibrary/myworkouts',
            config
          );
          const data = await response.json();
          const purchasedWorkoutsData = data.purchased_workouts || [];
          setPurchasedWorkouts(purchasedWorkoutsData);
        } catch (error) {
          setError(error);
          console.error('Error fetching user purchased workouts:', error);
        }
      };

      const fetchTrackingData = async () => {
        try {
          const response = await fetch(
            'http://localhost:8000/FitnessTracking/tracking',
            config
          );
          const data = await response.json();
          setTrackingData(data.fitness_track);
        } catch (error) {
          setError(error);
          console.error('Error fetching tracking data:', error);
        }
      };

      const fetchPersonalLibraryData = async () => {
        try {
          const response = await fetch(
            'http://localhost:8000/PersonalLibrary/mylibrary',
            config
          );
          const data = await response.json();
          setPersonalLibraryData(data.personal_library);
          console.log(data.personal_library)
          
        } catch (error) {
          setError(error);
          console.error('Error fetching personal library data:', error);
        }
      };

      await Promise.all([
        fetchUserProfile(),
        fetchTrackingData(),
        fetchPersonalLibraryData(),
      ]);

      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>User's Personal Library Profile</h2>

      {purchasedWorkouts.length > 0 ? (
        <div>
          <h1>User's Purchased Workouts</h1>
          {purchasedWorkouts.map((item) => (
            <div key={item._id} style={styles.workoutContainer}>
              <Typography variant="h4" component="span" fontWeight="medium" style={styles.workoutTitle}>
                {item.workout_name}
              </Typography>
              <Typography component="span" style={styles.workoutId}>
                (ID: {item._id})
              </Typography>
              <LinearProgress
                variant="determinate"
                value={item.progress}
                color="primary"
                sx={{ backgroundColor: 'teal' }}
              />
              <Typography component="p" style={styles.workoutDetails}>
                Difficulty Level: {item.difficulty_level}
              </Typography>
              <Typography component="p" style={styles.workoutDetails}>
                Description: {item.workout_description}
              </Typography>
              <Typography component="p" style={styles.workoutDetails}>
                Goal: {item.goal}
              </Typography>
              <Typography component="p" style={styles.workoutDetails}>
                Calories Burned: {item.calories_burned}
              </Typography>
              <Typography component="p" style={styles.workoutDetails}>
                Duration: {item.duration} minutes
              </Typography>
            </div>
          ))}
        </div>
      ) : (
        <p>No purchased workouts found.</p>
      )}

      <h1>User's Tracking Data</h1>

      {trackingData && trackingData.length > 0 ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Calories Eaten</TableCell>
                <TableCell>Daily Calories</TableCell>
                <TableCell>BMI</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Height</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trackingData.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.calories_eaten}</TableCell>
                  <TableCell>{item.daily_calories}</TableCell>
                  <TableCell>{item.bmi}</TableCell>
                  <TableCell>{item.weight}</TableCell>
                  <TableCell>{item.height}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>No tracking data found.</p>
      )}


    </div>
  );
};

    const styles = {
      workoutContainer: {
        border: '1px solid teal',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
      },
      workoutTitle: {
        marginBottom: 8,
      },
      workoutId: {
        color: 'teal',
        marginBottom: 16,
      },
      workoutDetails: {
        marginBottom: 8,
      },
    };

export default UserProfile;
