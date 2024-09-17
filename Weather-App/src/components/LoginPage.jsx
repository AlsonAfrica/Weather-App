import React, { useState, useEffect } from 'react';
import './LogInPage.css';
import { TextField, Button, Typography, Container, Box, FormControl, InputLabel, InputAdornment, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate();

  useEffect(() => {
    setOpenDialog(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setOpenDialog(true);
      return;
    }
    
    setLoading(true); // Show loader
    setTimeout(() => { // Simulate an async operation
      if (isRegistering) {
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match!');
          setLoading(false); // Hide loader
          return;
        }
        // Handle registration logic
        localStorage.setItem('user', JSON.stringify({ username: formData.username, password: formData.password }));
        alert('Registration successful!');
        setFormData({
          username: '',
          password: '',
          confirmPassword: ''
        });
      } else {
        // Handle login logic
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.username === formData.username && storedUser.password === formData.password) {
          alert('Login successful!');
          navigate('/HomePage'); // Navigate to the HomePage after successful login
        } else {
          alert('Invalid credentials!');
        }
      }
      setLoading(false); // Hide loader
    }, 2000); // Simulate a delay for demo purposes
  };

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
    setOpenDialog(false);
  };

  const handleDeclineTerms = () => {
    setAcceptedTerms(false);
    setOpenDialog(false);
  };

  return (
    <div className='wrapper'>
      <h1 className='logo-app'>Central 1: Weather App</h1>
      <p className='logo-text'>Welcome to Central 1: Weather App, your ultimate weather companion designed to keep you informed and prepared, no matter where you are. Our app provides accurate and real-time weather information, tailored to your needs.</p>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: 'white',
          }}
        >
          <Typography component="h1" variant="h5">
            {isRegistering ? 'Register' : 'Login'}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel htmlFor="password">Password</InputLabel>
              <TextField
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                label="Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleClickShowPassword}
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            {isRegistering && (
              <FormControl variant="outlined" fullWidth margin="normal">
                <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  label="Confirm Password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={handleClickShowPassword}
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              {isRegistering ? 'Register' : 'Login'}
            </Button>
            <Button
              onClick={() => setIsRegistering(!isRegistering)}
              fullWidth
            >
              {isRegistering ? 'Already have an account? Login' : 'Don’t have an account? Register'}
            </Button>
          </Box>
          {loading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100px',
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Container>

      {/* Dialog for Privacy Terms */}
      <Dialog
        open={openDialog}
        onClose={handleDeclineTerms}
      >
        <DialogTitle>Privacy and Data Protection</DialogTitle>
        <DialogContent>
          <Typography>
            By using this application, you agree to the protection of your data and privacy. Please review our privacy policy to understand how we handle your information.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeclineTerms} color="secondary">
            Decline
          </Button>
          <Button onClick={handleAcceptTerms} color="primary">
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AuthForm;
